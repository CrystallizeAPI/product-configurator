'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Skus } from '@/use-cases/contracts/product';
import { getTotalPrice } from '@/app/actions/get-total-price';
import { CART_ID } from '@/utils/const';

export type PriceBarProps = {
    skus: Skus;
    onOpenCart: () => void;
};

export const usePriceBar = ({ skus, onOpenCart }: PriceBarProps) => {
    const lastCartIdRef = useRef<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>();

    useEffect(() => {
        (async () => {
            const { price, id } = await getTotalPrice(skus);
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
