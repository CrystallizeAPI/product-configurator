"use client";

import {
    useEffect,
    useActionState,
    useOptimistic,
    startTransition,
} from "react";

import type { Option, Skus, Variant } from "@/use-cases/contracts/product";
import { config } from "@/core/config";
import { useUrlState } from "@/utils/use-url-state";
import { handleCartAction } from "@/app/actions/handle-cart";
import { Cart } from "@crystallize/schema/shop";
import { CartItemInput } from "@/use-cases/contracts/cart-items-input";

type UseCurrentTotalProps = {
    currentVariant?: Variant;
    options?: Option[];
};

export const useTempCart = ({
    currentVariant,
    options,
}: UseCurrentTotalProps) => {
    const [skus] = useUrlState<Skus>();
    const [serverCart, handleCart] = useActionState<
        Partial<Cart> | null,
        FormData
    >(handleCartAction, null);

    const [cart, setOptimisticTotal] = useOptimistic(serverCart);

    useEffect(() => {
        const items = (Object.keys(skus) as Array<keyof Skus>).reduce<
            CartItemInput[]
        >((acc, key) => {
            key === "options"
                ? skus.options?.length &&
                  acc.push(
                      ...skus.options
                          .split(",")
                          .map((sku) => ({ quantity: 1, variant: { sku } }))
                  )
                : acc.push({
                      quantity: 1,
                      variant: { sku: skus[key] as string },
                  });

            return acc;
        }, []);

        const variants = [
            currentVariant,
            ...(currentVariant?.grips ?? []),
            ...(currentVariant?.saddles ?? []),
            ...(options ?? []),
        ];

        const gross = items.reduce((acc, item) => {
            const variant = variants.find(
                (variant) => variant?.sku === item.variant.sku
            );

            return acc + (variant?.price.value ?? 0);
        }, 0);

        startTransition(() => {
            setOptimisticTotal((prev) => ({
                ...prev,
                total: {
                    gross,
                    currency: config.currency,
                    // in a real life scenario, you would also calculate net, taxAmount and discounts optimistically
                    net: gross,
                    taxAmount: 0,
                    discounts: [],
                },
            }));

            const form = new FormData();
            form.append("skus", JSON.stringify(items));
            handleCart(form);
        });
    }, [JSON.stringify(skus)]);

    return cart;
};
