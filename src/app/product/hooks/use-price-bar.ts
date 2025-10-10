"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getCartTotalPrice } from "@/use-cases/get-cart-total-price";
import { CART_ID } from "../../../utils/const";
import type { Skus } from "../types";

export type PriceBarProps = {
    skus: Skus;
    onOpenCart: () => void;
};

export const usePriceBar = ({ skus, onOpenCart }: PriceBarProps) => {
    const lastCartIdRef = useRef<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>();

    useEffect(() => {
        (async () => {
            const { price, id } = await getCartTotalPrice(skus);
            lastCartIdRef.current = id;
            setPrice(price);
        })();
    }, [skus]);

    const onSaveCartClick = useCallback(async () => {
        !!lastCartIdRef.current && localStorage.setItem(CART_ID, lastCartIdRef.current);

        onOpenCart();
    }, [skus]);

    return { price, onSaveCartClick };
};
