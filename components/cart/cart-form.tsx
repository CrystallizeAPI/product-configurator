"use client";

import { useActionState } from "react";

import { formatPrice } from "@/utils/format-price";
import { placeOrder } from "@/app/actions/place-order";

import { CartCustomer } from "./cart-customer";
import { CartItem } from "./cart-item";
import { useCartContext } from "@/context/cart-context";

type CartFormProps = {
    onOrderPlaced: (id: string) => void;
};

export function CartForm({ onOrderPlaced }: CartFormProps) {
    const { cart, emptyCart } = useCartContext();

    const [, onSubmit, isPending] = useActionState<string | null, FormData>(
        async (...param) => {
            const orderId = await placeOrder(...param);

            onOrderPlaced(orderId);
            emptyCart?.();

            return orderId;
        },
        null
    );

    if (!cart || !cart?.items?.length) {
        return (
            <div className="grid w-full h-full place-content-center text-base font-medium text-gray-500">
                <h2 className="font-medium text-gray-800 pb-8 text-2xl py-7 px-12">
                    Your cart is empty
                </h2>
            </div>
        );
    }

    return (
        <>
            <form className="flex flex-col h-full" action={onSubmit}>
                <input
                    type="hidden"
                    name="items"
                    value={JSON.stringify(cart.items)}
                />
                <h2 className="font-medium text-gray-800 pb-8 text-2xl py-7 px-12">
                    Your shopping cart
                </h2>
                <div className="mx-12">
                    {!!cart.items?.length && <CartItem items={cart.items} />}
                </div>
                <div className="pb-12 px-12">
                    <div className="mt-12">
                        <CartCustomer />
                        <div className="px-12  bg-gray-100 rounded-xl py-6 mt-12">
                            <div className="flex flex-col  justify-between items-center">
                                <h3 className="flex flex-col w-full py-4">
                                    <span className="text-sm font-medium text-gray-600">
                                        Total
                                    </span>
                                    <span className="text-3xl font-medium">
                                        {formatPrice({
                                            value: cart.total?.gross,
                                            currency: cart.total?.currency,
                                        })}
                                    </span>
                                </h3>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="px-8 py-4 rounded-xl w-full bg-gray-800 font-medium text-white"
                                >
                                    Place order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
