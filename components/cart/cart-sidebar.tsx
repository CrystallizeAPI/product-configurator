"use client";

import clsx from "classnames";

import { useCart } from "./use-cart";
import { OrderConfirmation } from "./order-confirmation";
import { CheckoutForm } from "./checkout-form";

export function CartSidebar() {
    const { cart, isOpen, setIsOpen } = useCart();

    return (
        <div
            className={clsx(
                "bg-white transition-all border-l-muted border-l w-[500px] p-12 h-full z-10 overflow-y-auto",
                "flex flex-col fixed top-0 right-0 border-muted",
                !isOpen && "!-right-[505px]"
            )}
        >
            <button
                onClick={() => setIsOpen(false)}
                className={clsx(
                    "absolute top-6 right-6 rounded cursor-pointer",
                    "border border-transparent hover:border-muted p-2 bg-gray-100"
                )}
            >
                <svg height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>

            {!cart ? (
                <div className="grid w-full h-full place-content-center text-base font-medium text-gray-500">
                    <h2 className="font-medium text-gray-800 pb-8 text-2xl py-7 px-12">
                        Your cart is empty
                    </h2>
                </div>
            ) : false ? (
                <OrderConfirmation
                    orderId=""
                    onCloseCart={() => setIsOpen(false)}
                />
            ) : (
                <CheckoutForm />
            )}
        </div>
    );
}
