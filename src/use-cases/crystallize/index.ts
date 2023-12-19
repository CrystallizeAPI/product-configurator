"use server";

import type { ClientInterface } from "@crystallize/js-api-client";
import { getProduct } from "./read/get-product";
import { saveCart } from "./write/save-cart";

export const getApi = (apiClient: ClientInterface) => {
    return {
        saveCart,
        getProduct: getProduct.bind(null, apiClient),
    };
};
