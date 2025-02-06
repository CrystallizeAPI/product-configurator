'use server';

import { shopApiClient } from '@/core';
import { getCartTotalPrice } from '@/use-cases/crystallize';
import { Skus } from '@/use-cases/contracts/product';
import { priceFormatter } from '@/utils/format-price';

export async function getTotalPrice(skus: Skus) {
    const items = (Object.keys(skus) as Array<keyof Skus>).reduce<{ sku: string }[]>((acc, key) => {
        key === 'options'
            ? skus.options?.length && acc.push(...skus.options.split(',').map((sku) => ({ sku })))
            : acc.push({ sku: skus[key] as string });

        return acc;
    }, []);

    const { id, total } = await getCartTotalPrice(shopApiClient, { items });

    return {
        id,
        price: priceFormatter({ value: total.gross, currency: total.currency }),
    };
}
