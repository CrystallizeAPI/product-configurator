"use server";

import { storage } from "@/core/storage.server";
import { fetchCart } from "@/use-cases/fetch-cart";

export const getCart = async () => {
    const cartId = await storage.getCartId();

    const cart = cartId
        ? await fetchCart(cartId)
        : {
              items: [],
              total: {
                  currency: "eur",
                  gross: 0,
                  net: 0,
                  taxAmount: 0,
              },
          };

    return {
        cart: {
            ...cart,
            items: cart.items?.map((item) => ({
                ...item.variant,
                image: item.images?.[0],
            })),
        },
        cartId,
    };
};
