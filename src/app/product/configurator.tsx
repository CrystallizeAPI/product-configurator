"use client";

import VariantSelector from "./components/variant-selector";
import Image from "next/image";
import type { UiProduct } from "@/use-cases/contracts/product";
import { useConfigurator } from "./hooks/use-configurator";
import { SaddleSelector } from "./components/saddle-selector";
import { GripSelector } from "./components/grip-selector";
import { AccessorySelector } from "./components/accessory-selector";

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
    const { name, variants, options } = product;
    const { skus, getViewer, currentVariant, isModelLoaded, onChange } =
        useConfigurator(product);

    return (
        <div className="flex min-h-screen bg-[#F7F6F9] relative  items-center justify-between min-w-full ">
            <div className="h-screen w-full relative">
                {!!currentVariant && (
                    <>
                        <model-viewer
                            id="viewer"
                            ref={getViewer}
                            src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/SpeedCurve.glb"
                            camera-orbit="-135deg 0 0"
                            // camera-target="-0.4m 0.5m 0"
                            camera-controls
                            shadow-intensity="4"
                            shadow-softness="1"
                            exposure="1.3"
                            environment-image="https://cdn2.charpstar.net/HDR/HDRI-Default.hdr"
                        />
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
                            />
                        </div>
                    </>
                )}
                <div className="from-[#F7F6F9] to-transparent absolute bg-gradient-to-l h-screen w-52 top-0 right-0 z-1 pointer-events-none" />
            </div>
            <div className="px-12 h-screen pt-10 overflow-hidden">
                <div className="shrink-0">
                    <h2 className="text-2xl font-medium text-gray-600">
                        {name}
                    </h2>
                    <p className="font-medium text-gray-600">
                        A classic curved bicycle re-imageined and engineered in
                        modern materials. No plastic.
                    </p>
                </div>

                <div className="py-4">
                    <h2 className="font-medium text-sm pb-2">Frame Color</h2>
                    <div className="grid grid-cols-5 gap-1">
                        {variants?.map((variant) => (
                            <VariantSelector
                                key={variant.sku}
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
                    <h2 className="font-medium text-sm pb-2">Grip options</h2>
                    <GripSelector
                        grips={currentVariant?.grips}
                        skus={skus}
                        onChange={(value) => onChange({ type: "grip", value })}
                    />
                </div>
                <div className="py-4">
                    <h2 className="font-medium text-sm pb-2">Accessories</h2>
                    <AccessorySelector
                        options={options}
                        skus={skus}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}
