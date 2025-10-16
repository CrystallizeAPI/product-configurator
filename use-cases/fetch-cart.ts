import { storage } from "@/core/storage.server";
import { crystallizeClient } from "@/core/crystallize-client.server";
import { cartHydrationQuery, hydrateCart } from "./hydrate-cart";
import { createCartManager } from "@crystallize/js-api-client";

export async function fetchCart(id?: string) {
    if (!id) {
        const hydrate = await hydrateCart({});
        !!hydrate?.id && (await storage.real.setCartId(hydrate.id));

        return hydrate;
    }

    try {
        const { fetch } = createCartManager(crystallizeClient);
        return await fetch(id, cartHydrationQuery);
    } catch (exception) {
        console.error(exception);
    }
}
