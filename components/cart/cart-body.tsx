"use client";

import { useState } from "react";

import { CartForm } from "./cart-form";
import { OrderConfirmation } from "./order-confirmation";

type CartProps = {
    onClose: () => void;
};

export const CartBody = ({ onClose }: CartProps) => {
    const [orderId, setOrderId] = useState<string | undefined>(undefined);

    const onCloseCart = () => {
        setOrderId(undefined);
        onClose();
    };

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
                <CartForm onOrderPlaced={setOrderId} />
            )}
        </>
    );
};
