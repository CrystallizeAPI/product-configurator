"use client";

import { useState } from "react";
import Image from "next/image";

import type { UiProduct } from "@/use-cases/contracts/product";

import { useConfigurator } from "./hooks/use-configurator";
import { SaddleSelector } from "./components/saddle-selector";
import { GripSelector } from "./components/grip-selector";
import { AccessorySelector } from "./components/accessory-selector";
import { PriceBar } from "./components/price-bar";
import { Cart } from "./components/cart";
import VariantSelector from "./components/variant-selector";
import { ModelViewer } from "./components/model-viewer";

const priceFormatter = (price?: { value?: number; currency?: string }) => {
    return !!price && price.value
        ? price.value.toLocaleString("en-US", {
              style: "currency",
              currency: price.currency,
          })
        : "";
};

type ConfiguratorProps = {
    product: UiProduct;
};

export default function Configurator({ product }: ConfiguratorProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { name, variants, options } = product;
    const { skus, getViewer, currentVariant, isModelLoaded, onChange } =
        useConfigurator(product);

    return (
        <div className="flex min-h-screen bg-[#F7F6F9] relative  items-center justify-between min-w-full ">
            <div className="h-screen w-full relative">
                {!!currentVariant && (
                    <>
                        <ModelViewer ref={getViewer} />
                        <div
                            className={`absolute top-0 left-0 w-full h-full bg-white transition pointer-events-none ${
                                isModelLoaded ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            <Image
                                width="1000"
                                height="1000"
                                src={currentVariant.imageUrl}
                                alt="Bicycle image"
                                className="w-full h-full object-contain"
                                loading="eager"
                                priority
                            />
                        </div>
                    </>
                )}
                <div className="from-[#F7F6F9] to-transparent absolute bg-gradient-to-l h-screen w-52 top-0 right-0 z-1 pointer-events-none" />
            </div>
            <div className="flex flex-col h-screen pt-10 overflow-hidden relative">
                <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    currentVariant={currentVariant}
                    options={options}
                    skus={skus}
                />
                <div className="shrink-0 px-12">
                    <h2 className="text-2xl font-medium text-gray-600">
                        {name}
                    </h2>
                    <p className="font-medium text-gray-600 mb-4">
                        A classic curved bicycle re-imageined and engineered in
                        modern materials. No plastic.
                    </p>
                </div>

                <div className="flex-1 overflow-auto px-12">
                    <div className="pb-4">
                        <h2 className="font-medium text-sm pb-2">
                            Frame Color
                        </h2>
                        <div className="grid grid-cols-5 gap-1">
                            {variants?.map((variant) => (
                                <VariantSelector
                                    key={variant.sku}
                                    skus={skus}
                                    variant={variant}
                                    onChange={(value) =>
                                        onChange({ type: "frame", value })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="py-4">
                        <h2 className="font-medium text-sm pb-2">
                            Saddles options
                        </h2>
                        <SaddleSelector
                            saddles={currentVariant?.saddles}
                            skus={skus}
                            onChange={(value) =>
                                onChange({ type: "saddle", value })
                            }
                        />
                    </div>
                    <div className="py-4">
                        <h2 className="font-medium text-sm pb-2">
                            Grip options
                        </h2>
                        <GripSelector
                            grips={currentVariant?.grips}
                            skus={skus}
                            onChange={(value) =>
                                onChange({ type: "grip", value })
                            }
                        />
                    </div>
                    <div className="py-4">
                        <h2 className="font-medium text-sm pb-2">
                            Accessories
                        </h2>
                        <AccessorySelector
                            options={options}
                            skus={skus}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="shrink-0 px-12 py-4">
                    <PriceBar
                        skus={skus}
                        currentVariant={currentVariant}
                        options={options}
                        onOpenCart={() => setIsCartOpen(true)}
                    />
                </div>
            </div>
        </div>
    );
}
