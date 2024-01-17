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

type ConfiguratorProps = {
    product: UiProduct;
};

export default function Configurator({ product }: ConfiguratorProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { name, variants, options } = product;
    const { skus, getViewer, currentVariant, isModelLoaded, onChange } =
        useConfigurator(product);

    return (
        <div className="w-full py-12">
            <div className="px-12">
                <h2 className="text-3xl font-medium pb-3 text-gray-600">
                    {name}
                </h2>
                <p className="text-normal text-lg text-gray-500 mb-2">
                    A classic curved bicycle re-imageined and engineered in
                    modern materials. No plastic.
                </p>
            </div>
            <div className="flex min-h-screen bg-white relative  justify-between min-w-full px-12 pt-12">
                <div className="relative w-full">
                    <div className="sticky top-8 h-[calc(100vh-64px)] w-full rounded-3xl bg-gray-100 ">
                        {!!currentVariant && (
                            <>
                                <ModelViewer ref={getViewer} />
                                <div
                                    className={`absolute top-0 left-0 w-full h-full bg-white transition pointer-events-none ${
                                        isModelLoaded
                                            ? "opacity-0"
                                            : "opacity-100"
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
                    </div>
                </div>

                <div className="flex flex-col relative h-auto">
                    <div
                        className={`bg-white fixed w-[500px] h-screen top-0 transition-all z-10 border-l ${
                            isCartOpen ? "right-0" : "-right-[501px]"
                        }`}
                    >
                        {isCartOpen && (
                            <Cart
                                onClose={() => setIsCartOpen(false)}
                                currentVariant={currentVariant}
                                options={options}
                                skus={skus}
                            />
                        )}
                    </div>
                    <div className="px-12 w-[500px]">
                        <div className="pb-4 min-h-[65vh] justify-center flex flex-col">
                            <h2 className="text-2xl  text-gray-800 pb-8 font-medium">
                                Frame it right -{" "}
                                <span className="text-gray-400">
                                    Your bike, your canvas.
                                </span>
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
                        <div className="py-4 min-h-[65vh]">
                            <h2 className="text-2xl  text-gray-800 pb-8 font-medium">
                                Time to saddle up -{" "}
                                <span className="text-gray-400">
                                    your bikes throne.
                                </span>
                            </h2>
                            <SaddleSelector
                                saddles={currentVariant?.saddles}
                                skus={skus}
                                onChange={(value) =>
                                    onChange({ type: "saddle", value })
                                }
                            />
                        </div>
                        <div className="py-4 min-h-[65vh]">
                            <h2 className="text-2xl  text-gray-800 pb-8 font-medium">
                                Grab life -{" "}
                                <span className="text-gray-400">
                                    by the handlebars.
                                </span>
                            </h2>

                            <GripSelector
                                grips={currentVariant?.grips}
                                skus={skus}
                                onChange={(value) =>
                                    onChange({ type: "grip", value })
                                }
                            />
                        </div>
                        <div className="py-4 pb-24">
                            <h2 className="text-2xl  text-gray-800 pb-8 font-medium">
                                Pedal in style -{" "}
                                <span className="text-gray-400">
                                    accessorize with a smile!
                                </span>
                            </h2>
                            <AccessorySelector
                                options={options}
                                skus={skus}
                                onChange={onChange}
                            />
                        </div>
                        <div className="px-12  bg-gray-100 rounded-xl py-12 mb-96">
                            <h2 className="text-2xl  text-gray-800 pb-4 font-medium">
                                Done and dusted -{" "}
                                <span className="text-gray-400">
                                    your bike, your way!
                                </span>
                            </h2>
                            <PriceBar
                                skus={skus}
                                onOpenCart={() => setIsCartOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
