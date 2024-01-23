"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<{
    isCartOpen: boolean;
    setIsCartOpen?: (isCartOpen: boolean) => void;
}>({ isCartOpen: false });

type CartProviderProps = {
    children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    return context;
};
