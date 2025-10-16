import { FocalPoint, Grid, ProductVariant } from "../__generated__/types";

export type ApiGrid = Grid;

export type UiProductVariant = Pick<ProductVariant, "name" | "sku" | "images" | "priceVariant"> & {
    product?: { paths?: { canonical?: string | null } | null } | null;
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
            showcase?: {
                hotspot?: FocalPoint;
                productVariant?: UiProductVariant;
            }[];
        };
    };
};

export type UiGrid = {
    id: string;
    rows: { columns: Column[] }[];
};
