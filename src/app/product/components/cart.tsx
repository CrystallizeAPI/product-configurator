"use client";

import type { Option, Variant } from "@/use-cases/contracts/product";
import { CartForm } from "./cart-form";
import type { Skus } from "../types";
import { useCart } from "../hooks/use-cart";
import { OrderConfirmation } from "./order-confirmation";

type CartProps = {
    onClose: () => void;
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
};

export const Cart = ({ onClose, currentVariant, options, skus }: CartProps) => {
    const { cartItem, price, onSubmit, orderId, onCloseCart } = useCart({
        currentVariant,
        options,
        skus,
        onClose,
    });

    if (!cartItem) {
        return null;
    }

    return (
        <>
            <button
                className="absolute top-6 right-6 rounded border border-transparent hover:border-gray-200 p-2 bg-gray-100"
                onClick={onCloseCart}
            >
                <svg height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>

            {!!orderId ? (
                <OrderConfirmation
                    orderId={orderId}
                    onCloseCart={onCloseCart}
                />
            ) : (
                <CartForm
                    onSubmit={onSubmit}
                    cartItem={cartItem}
                    price={price}
                />
            )}
        </>
    );
};
