import {
    Component,
    ProductPriceVariant,
    ProductVariant,
} from "../__generated__/types";

export type ApiProduct = {
    id: string;
    name: string;
    components?: Component[] | null;
    variants?: Array<
        ProductVariant & { defaultPrice: ProductPriceVariant }
    > | null;
};

type BaseItem = {
    name: string;
    sku: string;
    imageUrl: string;
    price: Price;
};

type OptionModelConfig = { modelAttribute: string; hex?: string }[];

export type Price = { value?: number; currency?: string };
export type Option = BaseItem & { id: string; model: OptionModelConfig };
export type Attribute = BaseItem & { modelAttribute: string; hex?: string };
export type Variant = BaseItem & {
    price: Price;
    frameColor?: Attribute;
    grips?: Attribute[];
    saddles?: Attribute[];
};

export type UiProduct = {
    id: string;
    name: string;
    glb?: string;
    options?: Option[];
    variants?: Variant[];
};

export type Skus = {
    v: string;
    grip?: string;
    saddle?: string;
    options?: string;
};
