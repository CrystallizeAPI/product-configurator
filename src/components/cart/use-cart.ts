import type { CartItem } from "../../app/product/types";
import { useEffect, useState } from "react";
import { CART_ID } from "../../utils/const";
import { getCart } from "@/use-cases/get-cart";

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
