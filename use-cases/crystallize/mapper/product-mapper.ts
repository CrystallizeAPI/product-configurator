import type {
    ServerProduct,
    UiProduct,
    Attribute,
} from "../../contracts/product";
import type {
    ContentChunkContent,
    ItemRelationsContent,
    Product,
    ProductVariant,
    SingleLineContent,
    ProductPriceVariant,
    Component,
    Image,
} from "../__generated__/types";

const getImage = (image?: Image | null) =>
    !!image
        ? {
              url: image.url,
              width: image.width ?? undefined,
              altText: image.altText ?? undefined,
          }
        : undefined;

const getConfig = (components?: Component[] | null) => {
    const config = components?.find((component) => component.id === "config");
    const configChunk = config?.content as ContentChunkContent;
    const attributeComponent = configChunk?.chunks[0].find(
        (component) => component.id === "3d-variant-attribute"
    );
    const hexComponent = configChunk?.chunks[0].find(
        (component) => component.id === "hex"
    );

    return {
        hex: (hexComponent?.content as SingleLineContent)?.text ?? "",
        modelAttribute:
            (attributeComponent?.content as SingleLineContent)?.text ?? "",
    };
};

const getOptions = (components: ServerProduct["components"]) => {
    const options = components?.find((component) => component.id === "options");
    if (!options?.content) {
        return undefined;
    }

    const content = options.content as ItemRelationsContent;
    return content.items?.reduce<NonNullable<UiProduct["options"]>>(
        (acc, item) => {
            const variant = (item as Product)
                .defaultVariant as ProductVariant & {
                defaultPrice?: ProductPriceVariant | null;
            };

            const { modelAttribute } = getConfig(
                (item as Product).defaultVariant?.components
            );

            if (!!variant) {
                acc.push({
                    id: modelAttribute,
                    name: variant.name ?? "",
                    sku: variant.sku,
                    image: getImage(variant.firstImage),
                    price: {
                        gross: variant.defaultPrice?.price ?? undefined,
                    },
                });
            }

            return acc;
        },
        []
    );
};

const getAttribute = (
    componentId: string,
    components: ServerProduct["components"]
) => {
    const options = components?.find(
        (component) => component.id === componentId
    );
    if (!options?.content) {
        return undefined;
    }

    const content = options.content as ItemRelationsContent;
    return content.productVariants?.reduce<Attribute[]>((acc, item) => {
        const variant = item as ProductVariant & {
            defaultPrice?: ProductPriceVariant | null;
        };

        if (!!variant) {
            acc.push({
                meta: [{ key: "type", value: "composable" }],
                name: variant.name ?? "",
                sku: variant.sku,
                image: getImage(variant.firstImage),
                price: {
                    gross: variant.defaultPrice?.price ?? undefined,
                },
                ...getConfig(variant.components),
            });
        }

        return acc;
    }, []);
};

export const productMapper = (product: ServerProduct) => {
    const nextProduct: UiProduct = {
        id: product.id,
        name: product.name,
        options: getOptions(product.components),
        variants: product.variants?.map((variant) => {
            return {
                meta: [{ key: "type", value: "main" } as const],
                name: variant.name ?? "",
                sku: variant.sku,
                image: getImage(variant.firstImage),
                frameColor: getAttribute(
                    "frame-color",
                    variant.components
                )?.[0],
                grips: getAttribute("grip-options", variant.components),
                saddles: getAttribute("saddle-options", variant.components),
                price: {
                    gross: variant.defaultPrice.price ?? undefined,
                    currency: variant.defaultPrice.currency ?? undefined,
                },
            };
        }),
    };

    return { product: nextProduct };
};
