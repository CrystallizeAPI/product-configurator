import {
    Component,
    ProductPriceVariant,
    ProductVariant,
} from "../crystallize/__generated__/types";

type Image = { url: string; width?: number; altText?: string };

export type ServerProduct = {
    id: string;
    name: string;
    components?: Component[] | null;
    variants?: Array<
        ProductVariant & { defaultPrice: ProductPriceVariant }
    > | null;
};

export type ServerCart = {
    id: string;
    total: Price;
    items?: {
        images?: Image[];
        variant: { name: string; sku: string };
    }[];
};

export type Price = {
    gross?: number;
    currency?: string;
    net?: number;
    taxAmount?: number;
    discounts?: {
        percent: number;
        amount: number;
    }[];
};

export type BaseItem = {
    name: string;
    sku: string;
    quantity?: number;
    price?: Price;
    image?: Image;
    meta?: Array<
        | { key: "type"; value: "main" | "composable" }
        | { key: "bom"; value: string }
    >;
};

export type Option = BaseItem & { id: string };
export type Attribute = BaseItem & { modelAttribute: string; hex?: string };
export type Variant = BaseItem & {
    price?: Price;
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

export type Skus = {
    v: string;
    grip?: string;
    saddle?: string;
    options?: string;
};

export type Cart = {
    id?: string;
    total: Price;
    items?: BaseItem[];
};
