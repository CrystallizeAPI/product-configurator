import type { Option, Variant } from "@/use-cases/contracts/product";
import type { Skus, CartItem } from "../types";
import { useEffect, useState } from "react";
import { CART_ID } from "../utils/const";
import { getCart } from "@/actions/get-cart";

type UseCartProps = {
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
    onClose: () => void;
};

type Cart = { cartItem: CartItem; price: string };

export const useCart = ({ currentVariant, options, skus }: UseCartProps) => {
    const [cart, setCart] = useState<Cart | undefined>();
    const cartId = localStorage.getItem(CART_ID);

    useEffect(() => {
        (async () => !!cartId && setCart(await getCart(cartId)))();
    }, [cartId]);

    if (!currentVariant || !options || !skus) {
        return {};
    }

    return {
        cartItem: cart?.cartItem,
        price: cart?.price,
    };
};
