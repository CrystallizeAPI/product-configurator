"use client";

import { useActionState } from "react";

import { setCustomerPlaceCart } from "@/app/actions/set-customer-place-cart";
import type { Cart } from "@/use-cases/contracts/product";
import type { Customer } from "@/use-cases/contracts/customer";

import { PaymentButton } from "../payment-button";
import { InputField } from "./input-field";
import { useCart } from "./use-cart";
import { CartItem } from "./cart-item";
import { makeCrystalPayment } from "@/app/actions/make-crystal-payment";
import { priceFormatter } from "@/utils/format-price";
import { useRouter } from "next/navigation";

type InitialState = {
    customer: Customer | null;
    cart: Cart | null;
    cartId?: string;
} | null;

export const CheckoutForm = () => {
    const { emptyCart, cart, setIsOpen } = useCart();
    const router = useRouter();

    const [data, onSubmit, isPending] = useActionState<InitialState, FormData>(
        async (state, payload) => {
            emptyCart();
            await setCustomerPlaceCart(state, payload);
            const paymentMethod = payload.get("paymentMethod") as string;

            if (paymentMethod === "crystal") {
                const id = await makeCrystalPayment();
                setIsOpen(false);
                router.push(`/order/${id}`);
            }

            return null;
        },
        null
    );

    const { customer, cartId } = data ?? {};

    return (
        <>
            <h2 className="font-medium text-gray-800 mb-8 text-2xl">
                Your shopping cart
            </h2>
            {!!cart?.items?.length && <CartItem items={cart.items} />}
            <h2 className="font-medium text-gray-800 mt-8 mb-2">Customer</h2>
            <form action={onSubmit}>
                <div className="bg-light rounded-xl border-muted border">
                    <div className="border-b border-muted">
                        <InputField
                            type="email"
                            name="email"
                            label="Email address"
                            defaultValue={customer?.addresses.email}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 border-b border-muted">
                        <div className="border-r border-muted">
                            <InputField
                                type="text"
                                name="firstName"
                                label="First name"
                                defaultValue={customer?.firstName}
                            />
                        </div>
                        <InputField
                            type="text"
                            name="lastName"
                            label="Last name"
                            defaultValue={customer?.lastName}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 border-b border-muted">
                        <div className="border-r border-muted">
                            <InputField
                                type="text"
                                name="street"
                                label="Street"
                                defaultValue={customer?.addresses.street}
                            />
                        </div>

                        <InputField
                            type="text"
                            name="postalCode"
                            label="Zip Code"
                            pattern="[0-9]{4}|[0-9]{5}"
                            defaultValue={customer?.addresses.postalCode}
                        />
                    </div>

                    <div className="grid md:grid-cols-2">
                        <div className="border-r border-muted">
                            <InputField
                                type="text"
                                name="city"
                                label="City"
                                defaultValue={customer?.addresses.city}
                            />
                        </div>
                        <InputField
                            type="text"
                            name="country"
                            label="Country"
                            defaultValue={customer?.addresses.country}
                        />
                    </div>
                </div>
                <h2 className="font-medium text-gray-800 mt-8 mb-2">Payment</h2>
                <div className="bg-light rounded-xl border-muted border">
                    <PaymentButton cartId={cartId} isPending={isPending} />
                </div>
                <div className="flex text-base justify-between font-bold mt-4">
                    <span className="">Total</span>
                    <span>
                        {priceFormatter({
                            value: cart?.total.gross,
                            currency: cart?.total.currency,
                        })}
                    </span>
                </div>
            </form>
        </>
    );
};
