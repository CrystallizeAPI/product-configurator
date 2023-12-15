"use server";

import {
    ApiProduct,
    UiProduct,
    Attribute,
} from "@/use-cases/contracts/product";
import {
    ContentChunkContent,
    ItemRelationsContent,
    Product,
    ProductVariant,
    SingleLineContent,
} from "../__generated__/types";

const getOptions = (components: ApiProduct["components"]) => {
    const options = components?.find((component) => component.id === "options");
    if (!options?.content) {
        return undefined;
    }

    const content = options.content as ItemRelationsContent;
    return content.items?.reduce<NonNullable<UiProduct["options"]>>(
        (acc, item) => {
            const variant = (item as Product).defaultVariant;

            if (!!variant) {
                acc.push({
                    name: variant.name ?? "",
                    sku: variant.sku,
                    imageUrl: variant.firstImage?.url ?? "",
                });
            }

            return acc;
        },
        []
    );
};

const getAttribute = (
    componentId: string,
    components: ApiProduct["components"]
) => {
    const options = components?.find(
        (component) => component.id === componentId
    );
    if (!options?.content) {
        return undefined;
    }

    const content = options.content as ItemRelationsContent;
    return content.productVariants?.reduce<Attribute[]>((acc, item) => {
        const variant = item as ProductVariant;
        const config = variant.components?.find(
            (component) => component.id === "config"
        );
        const configChunk = config?.content as ContentChunkContent;
        const attributeComponent = configChunk?.chunks[0].find(
            (component) => component.id === "3d-variant-attribute"
        );
        const hexComponent = configChunk?.chunks[0].find(
            (component) => component.id === "hex"
        );

        if (!!variant) {
            acc.push({
                name: variant.name ?? "",
                sku: variant.sku,
                imageUrl: variant.firstImage?.url ?? "",
                hex: (hexComponent?.content as SingleLineContent)?.text ?? "",
                "3dAttribute":
                    (attributeComponent?.content as SingleLineContent).text ??
                    "",
            });
        }

        return acc;
    }, []);
};

export const productMapper = (product: ApiProduct) => {
    const nextProduct: UiProduct = {
        id: product.id,
        name: product.name,
        options: getOptions(product.components),
        variants: product.variants?.map((variant) => {
            return {
                name: variant.name ?? "",
                sku: variant.sku,
                imageUrl: variant.firstImage?.url ?? "",
                frameColor: getAttribute(
                    "frame-color",
                    variant.components
                )?.[0],
                grips: getAttribute("grip-options", variant.components),
                saddles: getAttribute("saddle-options", variant.components),
                price: {
                    value: variant.defaultPrice.price ?? undefined,
                    currency: variant.defaultPrice.currency ?? undefined,
                },
            };
        }),
    };

    return { product: nextProduct };
};
