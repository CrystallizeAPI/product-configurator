import { NextResponse } from "next/server";
import { storage } from "@/core/storage.server";
import { fetchCart } from "@/use-cases/fetch-cart";
import { config } from "@/core/config";

export async function GET() {
    try {
        const cartId = await storage.real.getCartId();
        const cart = cartId
            ? await fetchCart(cartId)
            : { items: [], total: { currency: config.currency, gross: 0 } };
        return NextResponse.json(cart);
    } catch (err) {
        return Response.json(err, { status: 400 });
    }
}
