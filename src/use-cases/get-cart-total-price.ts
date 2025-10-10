import { crystallizeClient } from "@/core/crystallize-client.server";
import { createCartManager } from "@crystallize/js-api-client";
import { priceFormatter } from "@/utils/format-price";

import { language, currency } from "./variables";

export type Skus = {
    v: string;
    grip?: string;
    saddle?: string;
    options?: string;
};

type Data = {
    data: {
        hydrate: { id: string; total: { gross: number; currency: string } };
    };
};

export async function getCartTotalPrice(skus: Skus) {
    const items = (Object.keys(skus) as Array<keyof Skus>).reduce<{ quantity: number; sku: string }[]>((acc, key) => {
        key === "options"
            ? skus.options?.length && acc.push(...skus.options.split(",").map((sku) => ({ sku, quantity: 1 })))
            : acc.push({ quantity: 1, sku: skus[key] as string });

        return acc;
    }, []);

    const cart = createCartManager(crystallizeClient);

    const { id, total } = await cart.hydrate<{ id: string; total: { gross: number; currency: string } }>(
        {
            items,
            context: {
                ttl: 5000000,
                language,
                price: {
                    decimals: 4,
                    currency,
                    pricesHaveTaxesIncludedInCrystallize: true,
                    selectedVariantIdentifier: "",
                    discountOnNetPrices: false,
                    markets: [],
                },
            },
        },
        {
            total: {
                gross: true,
                currency: true,
            },
        }
    );

    return {
        id,
        price: priceFormatter({ value: total.gross, currency: total.currency }),
    };
}
