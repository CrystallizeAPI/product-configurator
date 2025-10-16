"use client";

import { useCallback, useEffect } from "react";

import type {
    Skus,
    Option,
    UiProduct,
    Attribute,
} from "@/use-cases/contracts/product";

import { useUrlState } from "@/utils/use-url-state";

type OnChange =
    | { type: "frame"; value: string }
    | { type: "saddle"; value: string }
    | { type: "grip"; value: string }
    | { type: "options"; value?: string };

type GetBagDependencies = {
    grip?: Attribute;
    skuOptions?: string;
    options?: Option[];
};

const getBagDependencies = ({
    grip,
    skuOptions,
    options,
}: GetBagDependencies) => {
    const modelAttribute = grip?.modelAttribute;
    const bagSku = options?.find((opt) => opt.id === "leatherBag")?.sku;
    if (
        modelAttribute === "Natural-Leather" ||
        (!!bagSku && !skuOptions?.includes(bagSku))
    ) {
        return { skuOptions, isBagHidden: false };
    }

    const nextOptions = skuOptions
        ?.split(",")
        .filter((sku) => sku !== bagSku)
        .join(",");

    return { skuOptions: nextOptions, isBagHidden: true };
};

export const useConfigurator = (product: UiProduct) => {
    const { variants, options } = product;
    const [skus, setSkus] = useUrlState<Skus>();
    const currentVariant = variants?.find((variant) => variant.sku === skus.v);

    // auto select the first variant when the param is not present in the URL
    useEffect(() => {
        const variant = variants?.[0];

        if (!skus.v && !!variant) {
            const { sku, saddles, grips } = variant;

            setSkus({
                v: sku,
                saddle: saddles?.[0].sku,
                grip: grips?.[0].sku,
            });
        }
    }, [setSkus, skus.v, variants, options]);

    const onChange = useCallback(
        ({ type, value }: OnChange) => {
            let nextSkus: Skus | undefined = undefined;

            switch (type) {
                case "frame": {
                    const nextVariant = variants?.find(
                        (variant) => variant.sku === value
                    );
                    const { frameColor, saddles, grips } = nextVariant ?? {};
                    const saddle = saddles?.[0].sku;
                    const grip = grips?.[0].sku;
                    const { skuOptions, isBagHidden } = getBagDependencies({
                        grip: grips?.[0],
                        skuOptions: skus.options,
                        options,
                    });

                    nextSkus = {
                        v: value,
                        saddle,
                        grip,
                        options: skuOptions,
                    };

                    break;
                }
                case "saddle": {
                    const saddle = currentVariant?.saddles?.find(
                        (variantSaddle) => variantSaddle.sku === value
                    );
                    const grip = currentVariant?.grips?.find(
                        (variantGrip) =>
                            variantGrip.modelAttribute ===
                            saddle?.modelAttribute
                    );
                    const { skuOptions, isBagHidden } = getBagDependencies({
                        grip,
                        skuOptions: skus.options,
                        options,
                    });

                    nextSkus = {
                        ...skus,
                        saddle: value,
                        grip: grip?.sku,
                        options: skuOptions,
                    };

                    break;
                }
                case "grip": {
                    const grip = currentVariant?.grips?.find(
                        (variantGrip) => variantGrip.sku === value
                    );
                    const saddle = currentVariant?.saddles?.find(
                        (variantSaddle) =>
                            variantSaddle.modelAttribute ===
                            grip?.modelAttribute
                    );
                    const { skuOptions, isBagHidden } = getBagDependencies({
                        grip,
                        skuOptions: skus.options,
                        options,
                    });

                    nextSkus = {
                        ...skus,
                        grip: value,
                        saddle: saddle?.sku,
                        options: skuOptions,
                    };

                    break;
                }
                case "options": {
                    nextSkus = {
                        ...skus,
                        options: !value ? undefined : value,
                    };
                    break;
                }
            }

            if (!!nextSkus) {
                const { v, ...restSkus } = nextSkus;
                // Make sure "v" (version) query param is always first
                setSkus({ v, ...restSkus });
            }
        },
        [setSkus, variants, currentVariant, skus, options]
    );

    return {
        skus,
        setSkus,
        currentVariant,
        onChange,
    };
};
