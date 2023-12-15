import {
    Component,
    ProductPriceVariant,
    ProductVariant,
} from "../crystallize/__generated__/types";

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
};

export type Price = { value?: number; currency?: string };
export type Attribute = BaseItem & { "3dAttribute": string; hex?: string };
export type Variant = BaseItem & {
    price: Price;
    frameColor?: Attribute;
    grips?: Attribute[];
    saddles?: Attribute[];
};

export type UiProduct = {
    id: string;
    name: string;
    options?: BaseItem[];
    variants?: Variant[];
};
