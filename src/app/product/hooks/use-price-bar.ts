"use client";

import type { Option, Variant } from "@/use-cases/contracts/product";

import type { Skus } from "../types";
import { useCallback, useEffect, useState } from "react";
import { priceFormatter } from "../../utils/format-price";
import { getTotalPrice } from "../../../actions/get-total-price";

export type PriceBarProps = {
    skus: Skus;
    onOpenCart: () => void;
};

export const usePriceBar = ({ skus, onOpenCart }: PriceBarProps) => {
    const [price, setPrice] = useState<string | undefined>();

    useEffect(() => {
        (async () => setPrice(await getTotalPrice(skus)))();
    }, [skus]);

    const onSaveCartClick = useCallback(async () => {
        // TODO: save cart
        // const { id } = await saveCart(skus);
        // localStorage.setItem(CART_ID, id);
        onOpenCart();
    }, [skus]);

    return { price, onSaveCartClick };
};
