"use server";

import { shopApiClient } from "@/core";
import { getCart as getCartQuery } from "@/use-cases/crystallize";
import { priceFormatter } from "@/utils/format-price";
import { CartItem } from "@/app/product/types";

export async function getCart(id: string) {
    const { items, total } = await getCartQuery(shopApiClient, id);

    const [firstItem, ...childrenItems] = items;
    const cartItem: CartItem = {
        name: firstItem.name,
        imageUrl: firstItem.images[0].url,
        sku: firstItem.variant.sku,
        price: firstItem.price,
        childrenItems: childrenItems.map((item) => ({
            name: item.name,
            imageUrl: item.images[0].url,
            sku: item.variant.sku,
            price: item.price,
        })),
    };

    return {
        cartItem,
        price: priceFormatter({ value: total.gross, currency: total.currency }),
    };
}
