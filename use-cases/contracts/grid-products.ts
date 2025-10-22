import { FocalPoint, Grid, ProductVariant } from "../__generated__/types";

export type GridProduct = {
    id: string;
    name: string;
    image: Image & {
        showcase?: {
            hotspot?: FocalPoint;
            productVariants?: UiProductVariant[];
        }[];
    };
};

export type ApiGridProducts = {
    subtree?: {
        edges?: {
            node?: {
                id: string;
                name: string;
                component: {
                    content: {
                        firstImage: Image & {
                            showcase?: {
                                hotspot?: FocalPoint;
                                productVariants?: UiProductVariant[];
                            }[];
                        };
                    };
                };
            };
        }[];
    };
};

export type UiProductVariant = Pick<
    ProductVariant,
    "name" | "sku" | "images" | "priceVariant"
> & {
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
