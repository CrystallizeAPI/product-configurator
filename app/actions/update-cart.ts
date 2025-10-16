"use server";

import { hydrateCart } from "@/use-cases/hydrate-cart";
import { storage } from "@/core/storage.server";

export async function updateCart(_: unknown, formData: FormData) {
    const type = formData.get("type") as string;

    if (type === "reset") {
        await storage.destroy();
        return null;
    }

    const prevCartId = await storage.real.getCartId();
    const tempCartId = await storage.temp.getCartId();
    const cartId = prevCartId ?? tempCartId;
    cartId === tempCartId && (await storage.temp.delete());

    const itemsData = JSON.parse(formData.get("items") as string) as { variant: { sku: string }; quantity?: number }[];
    const items = itemsData.map((item) => ({
        sku: item.variant.sku,
        quantity: item.quantity ?? 1,
    }));

    try {
        const cart = await hydrateCart({ id: cartId, items });
        !!cart?.id && (await storage.real.setCartId(cart.id));
        return cart
    } catch (error) {
        console.error("Cart update failed:", error);
        return null;
    }
}
