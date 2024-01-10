"use server";

import type { ClientInterface } from "@crystallize/js-api-client";
import { getProduct } from "./read/get-product";
import { getGrid } from "./read/get-grid";
import { saveCart } from "./write/save-cart";
import { createOrder } from "./write/create-order";

export const getApi = (apiClient: ClientInterface) => {
    return {
        saveCart,
        getProduct: getProduct.bind(null, apiClient),
        getGrid: getGrid.bind(null, apiClient),
        createOrder: createOrder.bind(null, apiClient),
    };
};
