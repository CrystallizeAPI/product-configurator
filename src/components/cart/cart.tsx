import { useEffect, useState } from "react";
import { CartBody } from "./cart-body";

type CartProps = {
    isCartOpen: boolean;
    setIsCartOpen: (isCartOpen: boolean) => void;
};

const setBodyOverflow = (isHidden: boolean) =>
    document.body.classList[isHidden ? "add" : "remove"]("!overflow-hidden");

export function Cart({ isCartOpen, setIsCartOpen }: CartProps) {
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
                        setIsCartOpen(false);
                    }}
                />
            )}
        </div>
    );
}
