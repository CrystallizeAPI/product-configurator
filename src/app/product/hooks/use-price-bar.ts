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
    return [0].reduce((acc, price) => acc + price, 0);
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
