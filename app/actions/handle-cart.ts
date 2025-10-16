"use server";

import { storage } from "@/core/storage.server";
import { hydrateCart } from "@/use-cases/hydrate-cart";
import { config } from "@/core/config";
import { Cart } from "@crystallize/schema/shop";
import { CartItemSlimInput } from "@/use-cases/contracts/cart-items-input";

export const handleCartAction = async (
    _: Partial<Cart> | null,
    formData: FormData
) => {
    try {
        const id = await storage.temp.getCartId();
        const items = JSON.parse(formData.get("skus") as string) as CartItemSlimInput[];
        const cart = await hydrateCart({
            id,
            items: items.map((item) => ({
                sku: item.variant.sku,
                quantity: item.quantity ?? 1,
            })),
        });
        !!cart?.id && (await storage.temp.setCartId(cart.id));
        return cart;
    } catch (e) {
        console.log(e);
        return { total: { gross: 0, net: 0, taxAmount: 0, discounts: [], currency: config.currency } };
    }
};
