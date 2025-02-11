"use client";

import { Image } from "@crystallize/reactjs-components";
import clsx from "classnames";

import type { UiProduct } from "@/use-cases/contracts/product";
import { ModelViewer } from "@/components/model-viewer";
import { useCart } from "@/components/cart/use-cart";

import { GripSelector } from "./grip-selector";
import { VariantSelector } from "./variant-selector";
import { SaddleSelector } from "./saddle-selector";
import { AccessorySelector } from "./accessory-selector";
import { useConfigurator } from "./use-configurator";

type ConfiguratorProps = {
    product: UiProduct;
};

export function Configurator({ product }: ConfiguratorProps) {
    const { onAddToCart } = useCart();
    const { variants, options } = product;
    const {
        skus,
        getViewer,
        currentVariant,
        isModelLoaded,
        onChange,
        items,
        total,
    } = useConfigurator(product);

    return (
        <>
            <div className="py-12 pl-12 flex-1 overflow-hidden flex flex-col">
                <h2 className="text-3xl font-medium pb-3 text-gray-600">
                    {product.name}
                </h2>
                <p className="text-normal text-lg text-gray-500 mb-2">
                    A classic curved bicycle re-imagined and engineered in
                    modern materials. No plastic.
                </p>

                <div className="w-full rounded-3xl bg-gray-100 flex-1 overflow-hidden relative">
                    {!!currentVariant && (
                        <>
                            <ModelViewer ref={getViewer} />
                            <Image
                                {...currentVariant.image}
                                className={clsx(
                                    "absolute inset-0 transition pointer-events-none",
                                    "crystallize-image-contain",
                                    isModelLoaded ? "opacity-0" : "opacity-100"
                                )}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="px-12 w-[500px] overflow-auto">
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
                    <h2 className="text-2xl text-gray-800 pb-8 font-medium">
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
                    <div className="flex flex-col justify-between items-center">
                        <h3 className="flex flex-col w-full border-t border-muted py-4">
                            <span className="text-sm font-medium text-gray-600">
                                Total
                            </span>
                            <span className="text-3xl font-medium">
                                {total}
                            </span>
                        </h3>
                        <button
                            type="submit"
                            onClick={() => {
                                const form = new FormData();
                                form.append("items", JSON.stringify(items));
                                onAddToCart(form);
                            }}
                            className="px-8 py-4 rounded-xl w-full bg-gray-800 font-medium text-white cursor-pointer"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
