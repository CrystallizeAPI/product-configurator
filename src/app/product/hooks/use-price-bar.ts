import type { Option, Variant } from "@/use-cases/contracts/product";

import type { Skus } from "../types";
import { useCallback } from "react";
import { priceFormatter } from "../../utils/format-price";
// import { CART_ID } from "../utils/const";
// import { saveCart } from "../actions/save-cart";

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
    const price = priceFormatter({
        value: getTotalPrice({ skus, currentVariant, options }),
        currency: currentVariant?.price.currency,
    });

    const onSaveCartClick = useCallback(async () => {
        // TODO: save cart
        // const { id } = await saveCart(skus);
        // localStorage.setItem(CART_ID, id);
        onOpenCart();
    }, []);

    return { price, onSaveCartClick };
};
