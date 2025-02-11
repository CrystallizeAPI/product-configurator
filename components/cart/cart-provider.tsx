"use client";

import {
    createContext,
    useActionState,
    useOptimistic,
    useEffect,
    useState,
    useTransition,
} from "react";
import { handleCart } from "@/app/actions/handle-cart";
import { getNextCart } from "@/use-cases/get-next-cart";
import { CartSidebar } from "./cart-sidebar";
import { Cart } from "@/use-cases/contracts/product";

type CartContextProps = {
    cart: Cart | null;
    isLoading: boolean;
    isOpen: boolean;
    emptyCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    onAddToCart: (formData: FormData) => void;
};

export const CartContext = createContext<CartContextProps | undefined>(
    undefined
);

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [initialCart, setInitialCart] = useState<Cart | null>(null);
    const [serverCart, handleCartAction, isLoading] = useActionState(
        handleCart,
        initialCart
    );
    const [cart, setOptimisticCart] = useOptimistic(serverCart ?? initialCart);
    const [, startTransition] = useTransition();

    useEffect(() => {
        fetch("/api/cart").then(async (res) => {
            if (res.ok) {
                const cart = await res.json();
                setInitialCart(cart);
            }
        });
    }, []);

    const onAddToCart = (formData: FormData) => {
        setIsOpen(true);
        startTransition(() => {
            setOptimisticCart(() =>
                getNextCart(JSON.parse(formData.get("items") as string))
            );

            handleCartAction(formData);
        });
    };

    const emptyCart = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("type", "reset");
            handleCartAction(formData);
            setInitialCart(null);
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isOpen,
                setIsOpen,
                isLoading,
                emptyCart,
                onAddToCart,
            }}
        >
            {children}
            <CartSidebar />
        </CartContext.Provider>
    );
};
