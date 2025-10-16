"use client";

import dynamic from "next/dynamic";
import type { UiProduct } from "@/use-cases/contracts/product";

import { useConfigurator } from "./hooks/use-configurator";
import { SaddleSelector } from "./components/saddle-selector";
import { GripSelector } from "./components/grip-selector";
import { AccessorySelector } from "./components/accessory-selector";
import { PriceBar } from "./components/price-bar";
import VariantSelector from "./components/variant-selector";

type ConfiguratorProps = {
    product: UiProduct;
};

const ModelViewer = dynamic(() => import("./components/model-viewer"), {
    ssr: false,
});

export default function Configurator({ product }: ConfiguratorProps) {
    const { variants, options } = product;
    const { skus, currentVariant, onChange } = useConfigurator(product);

    return (
        <div className="flex bg-white">
            <div
                className="sticky top-8 bottom-2 w-full rounded-3xl bg-gray-100"
                style={{ height: "calc(100vh - 160px)" }}
            >
                {!!currentVariant && !!product && (
                    <ModelViewer
                        skus={skus}
                        product={product}
                        currentVariant={currentVariant}
                    />
                )}
            </div>

            <div className="flex flex-col relative h-auto max-w-lg w-full pl-12">
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
                        onChange={(value) => onChange({ type: "grip", value })}
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
                <div className="px-12  bg-gray-100 rounded-xl py-12 mb-80">
                    <h2 className="text-2xl  text-gray-800 pb-4 font-medium">
                        Done and dusted -{" "}
                        <span className="text-gray-400">
                            your bike, your way!
                        </span>
                    </h2>
                    <PriceBar
                        currentVariant={currentVariant}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
