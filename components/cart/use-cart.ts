import { useEffect, useState } from 'react';
import { getCart } from '@/app/actions/get-cart';

import type { CartItem } from '@/use-cases/contracts/product';

import { CART_ID } from '@/utils/const';

type Cart = { cartItem: CartItem; price: string };

export const useCart = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState<Cart | undefined>();
    const cartId = localStorage.getItem(CART_ID);

    useEffect(() => {
        (async () => {
            !!cartId && setCart(await getCart(cartId));
            setIsLoading(false);
        })();
    }, [cartId]);

    return {
        isLoading,
        cartItem: cart?.cartItem,
        price: cart?.price,
    };
};
