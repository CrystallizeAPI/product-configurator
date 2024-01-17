import type { CartItem } from "../../app/product/types";
import { useEffect, useState } from "react";
import { CART_ID } from "../../utils/const";
import { getCart } from "@/actions/get-cart";

type Cart = { cartItem: CartItem; price: string };

export const useCart = () => {
    const [cart, setCart] = useState<Cart | undefined>();
    const cartId = localStorage.getItem(CART_ID);

    useEffect(() => {
        (async () => !!cartId && setCart(await getCart(cartId)))();
    }, [cartId]);

    return {
        cartItem: cart?.cartItem,
        price: cart?.price,
    };
};
