import type {
    ApiProduct,
    UiProduct,
    Attribute,
} from "@/use-cases/contracts/product";
import type {
    ContentChunkContent,
    ItemRelationsContent,
    Product,
    ProductVariant,
    SingleLineContent,
    ProductPriceVariant,
    Component,
    FileContent,
} from "./__generated__/types";

const getModel = (components?: Component[] | null) => {
    const config = components?.find((component) => component.id === "config");
    const configChunk = config?.content as ContentChunkContent;

    return configChunk?.chunks.map((chunk) => {
        const attributeComponent = chunk.find(
            (component) => component.id === "3d-variant-attribute"
        );
        const hexComponent = chunk.find((component) => component.id === "hex");

        return {
            hex: (hexComponent?.content as SingleLineContent)?.text ?? "",
            modelAttribute:
                (attributeComponent?.content as SingleLineContent)?.text ?? "",
        };
    });
};

const getOptions = (components: ApiProduct["components"]) => {
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
            const components = (item as Product).defaultVariant?.components;
            const model = getModel(components);

            if (!!variant) {
                acc.push({
                    id: model[0].modelAttribute,
                    model,
                    name: variant.name ?? "",
                    sku: variant.sku,
                    imageUrl: variant.firstImage?.url ?? "",
                    price: {
                        value: variant.defaultPrice?.price ?? undefined,
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
        const variant = item as ProductVariant & {
            defaultPrice?: ProductPriceVariant | null;
        };

        if (!!variant) {
            acc.push({
                name: variant.name ?? "",
                sku: variant.sku,
                imageUrl: variant.firstImage?.url ?? "",
                ...getModel(variant.components)[0],
                price: {
                    value: variant.defaultPrice?.price ?? undefined,
                },
            });
        }

        return acc;
    }, []);
};

export const productMapper = (product: ApiProduct) => {
    const viewerChunkContent = product.components?.find(
        (component) => component.id === "3d-viewer"
    )?.content as ContentChunkContent;

    const glb = (viewerChunkContent.chunks?.[0]?.[0]?.content as FileContent)
        ?.firstFile?.url;

    const nextProduct: UiProduct = {
        id: product.id,
        name: product.name,
        glb,
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
