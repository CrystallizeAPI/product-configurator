"use client";

import { useEffect } from "react";
import { CartBody } from "./cart-body";
import { useCartContext } from "@/context/cart-context";

const setBodyOverflow = (isHidden: boolean) =>
    document.body.classList[isHidden ? "add" : "remove"]("!overflow-hidden");

export function Cart() {
    const { isCartOpen, setIsCartOpen } = useCartContext();
    useEffect(() => setBodyOverflow(isCartOpen), [isCartOpen]);

    return (
        <div
            className={`bg-white fixed w-[500px] overflow-auto h-screen top-0 transition-all z-10 border-l ${
                isCartOpen ? "right-0" : "-right-[501px]"
            }`}
        >
            {isCartOpen && (
                <CartBody
                    onClose={() => {
                        setBodyOverflow(false);
                        setIsCartOpen?.(false);
                    }}
                />
            )}
        </div>
    );
}
