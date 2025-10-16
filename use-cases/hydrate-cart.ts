import { crystallizeClient } from "@/core/crystallize-client.server";
import { createCartManager } from "@crystallize/js-api-client";
import { config } from "@/core/config";
import { Cart } from "@crystallize/schema/shop";

type HydrateCartProps = {
    id?: string;
    items?: { sku: string; quantity: number }[];
};

export const cartHydrationQuery = {
    id: true,
    items: {
        name: true,
        quantity: true,
        variant: {
            sku: true,
        },
        price: {
            net: true,
            gross: true,
            currency: true,
        },
        images: {
            url: true,
            width: true,
            height: true,
        },
    },
    total: {
        gross: true,
        currency: true,
    },
};

export async function hydrateCart({ id, items }: HydrateCartProps) {
    const manager = createCartManager(crystallizeClient);
    try {
        const cart = await manager.hydrate<Cart>(
            {
                ...(!!id && { id }),
                items,
                context: {
                    language: config.language,
                    ttl: 60 * 60 * 24 * 1,
                    price: {
                        currency: config.currency,
                        decimals: 2,
                        pricesHaveTaxesIncludedInCrystallize: false,
                        discountOnNetPrices: false,
                        selectedVariantIdentifier: "default",
                        markets: [],
                    },
                },
            },
            cartHydrationQuery
        );
        return cart;
    } catch (exception) {
        console.log(exception);
        return null;
    }
}
