import { FocalPoint, Grid, ProductVariant } from '../crystallize/__generated__/types';

export type ApiGrid = Grid;

export type UiProductVariant = Pick<ProductVariant, 'name' | 'sku' | 'priceVariant'> & {
    product?: { paths?: { canonical?: string | null } | null } | null;
    images?: { url: string; width: number; altText?: string }[];
};

type Image = {
    url?: string;
    width?: number | null;
    height?: number | null;
    alt?: string | null;
    variants?:
        | {
              url: string;
              key: string;
              width?: number | null;
              height?: number | null;
          }[]
        | null;
};

export type Showcase = {
    hotspot?: FocalPoint;
    productVariant?: UiProductVariant;
};

export type Column = {
    index: number;
    layout: {
        colspan: number;
        rowspan: number;
        colIndex: number;
        rowIndex: number;
    };
    item: {
        name: string;
        image: Image & {
            showcase?: Showcase[];
        };
    };
};

export type UiGrid = {
    id: string;
    rows: { columns: Column[] }[];
};
