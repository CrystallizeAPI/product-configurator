"use client";

import type { Option, Variant } from "@/use-cases/contracts/product";
import { CartForm } from "./cart-form";
import type { Skus } from "../types";
import { useCart } from "../hooks/use-cart";
import { CartItem } from "./cart-item";
import { priceFormatter } from "../../utils/format-price";
import { OrderConfirmation } from "./order-confirmation";

type CartProps = {
    isOpen: boolean;
    onClose: () => void;
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
};

export const Cart = ({
    isOpen,
    onClose,
    currentVariant,
    options,
    skus,
}: CartProps) => {
    const { cartItems, price, onSubmit, orderId, onCloseCart } = useCart({
        currentVariant,
        options,
        skus,
        onClose,
    });

    return (
        <div
            className={`bg-white absolute w-full h-full top-0 transition-all z-10 ${
                isOpen ? "left-0" : "left-full"
            }`}
        >
            <button
                className="absolute top-2 right-2 p-2"
                onClick={onCloseCart}
            >
                <svg height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>

            {isOpen && !!orderId ? (
                <OrderConfirmation
                    orderId={orderId}
                    onCloseCart={onCloseCart}
                />
            ) : (
                <CartForm
                    onSubmit={onSubmit}
                    cartItems={cartItems}
                    price={price}
                />
            )}
        </div>
    );
};
