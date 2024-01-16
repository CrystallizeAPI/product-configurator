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
    price: Price;
};

export type Price = { value?: number; currency?: string };
export type Option = BaseItem & { id: string };
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
    options?: Option[];
    variants?: Variant[];
};
