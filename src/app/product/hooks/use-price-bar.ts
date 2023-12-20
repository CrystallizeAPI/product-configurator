import type { Option, Variant } from "@/use-cases/contracts/product";
//import { services } from "@/core/services";
import { saveCart } from "@/use-cases/crystallize/write/save-cart";

import type { Skus } from "../types";
import { useCallback } from "react";
import { CART_ID } from "../utils/const";
import { priceFormatter } from "../utils/format-price";

export type PriceBarProps = {
    skus: Skus;
    currentVariant: Variant | undefined;
    options: Option[] | undefined;
    onOpenCart: () => void;
};

const getTotalPrice = ({
    skus,
    currentVariant,
    options,
}: Omit<PriceBarProps, "onOpenCart">) => {
    const framePrice = currentVariant?.price.value ?? 0;
    const saddlePrice =
        currentVariant?.saddles?.find((saddle) => saddle.sku === skus.saddle)
            ?.price.value ?? 0;
    const gripPrice =
        currentVariant?.grips?.find((grip) => grip.sku === skus.grip)?.price
            .value ?? 0;
    const frontRack = skus.frontRack
        ? options?.find((opt) => opt.sku === skus.frontRack)?.price.value ?? 0
        : 0;
    const rearRack = skus.rearRack
        ? options?.find((opt) => opt.sku === skus.rearRack)?.price.value ?? 0
        : 0;
    const bagPrice = skus.leatherBag
        ? options?.find((opt) => opt.sku === skus.leatherBag)?.price.value ?? 0
        : 0;

    return [
        framePrice,
        saddlePrice,
        gripPrice,
        frontRack,
        rearRack,
        bagPrice,
    ].reduce((acc, price) => acc + price, 0);
};

export const usePriceBar = ({
    currentVariant,
    skus,
    options,
    onOpenCart,
}: PriceBarProps) => {
    //const { api } = services();
    const price = priceFormatter({
        value: getTotalPrice({ skus, currentVariant, options }),
        currency: currentVariant?.price.currency,
    });

    const onSaveCartClick = useCallback(async () => {
        const input = {
            items: (Object.keys(skus) as Array<keyof typeof skus>).map(
                (key) => {
                    return {
                        sku: skus[key] as string,
                        quantity: 1,
                    };
                }
            ),
        };

        const { id } = await saveCart(input);
        localStorage.setItem(CART_ID, id);
        onOpenCart();
    }, []);

    return { price, onSaveCartClick };
};
