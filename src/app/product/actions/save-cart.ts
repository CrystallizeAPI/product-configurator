"use server";

import { services } from "@/core/services";
import type { Skus } from "../types";

export const saveCart = async (skus: Skus) => {
    const { api } = await services();

    const input = {
        items: (Object.keys(skus) as Array<keyof typeof skus>).map((key) => {
            return {
                sku: skus[key] as string,
                quantity: 1,
            };
        }),
    };

    return await api.saveCart(input);
};
