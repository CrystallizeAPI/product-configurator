"use server";

import { hydrateCart } from "@/use-cases/hydrate-cart";
import type { BaseItem, Cart } from "@/use-cases/contracts/product";

import { storage } from "@/core/storage.server";

export async function handleCart(initialSate: Cart | null, formData: FormData) {
    const type = formData.get("type") as string;

    if (type === "reset") {
        return null;
    }

    try {
        const items = JSON.parse(formData.get("items") as string) as BaseItem[];
        const cartId = await storage.getCartId();
        const cartItems = items.map((item) => ({
            sku: item.sku,
            quantity: 1,
            meta: item.meta,
        }));
        const cart = await hydrateCart(cartId, cartItems);

        return {
            total: cart.total,
            items: cart.items?.map((item) => ({
                ...item.variant,
                image: item.images?.[0],
            })),
        } as Cart;
    } catch (error) {
        console.error("Cart update failed:", error);
        return null;
    }
}
