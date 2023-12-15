"use server";

import type { ClientInterface } from "@crystallize/js-api-client";
import { getProduct } from "./read/get-product";
import { productMapper } from "./mapper/product-mapper";

export const getApi = (apiClient: ClientInterface) => {
    return {
        getProduct: async (path: string) => {
            const product = await getProduct(apiClient, path);
            return productMapper(product);
        },
    };
};
