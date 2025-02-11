import { useState } from "react";
import Image from "next/image";
import clsx from "classnames";

import { Stripe } from "./payments/stripe";
import { Crystal } from "./payments/crystal";
import StripeLogo from "@/assets/stripe-logo.svg";
import CrystallizeLogo from "@/assets/crystallize-logo.svg";

type PaymentMethod = number | null;

const paymentMethods = [
    {
        id: 1,
        name: "crystal coin",
        component: Crystal,
        description: "For test purposes only",
        img: CrystallizeLogo,
    },
    {
        id: 2,
        name: "Stripe",
        component: Stripe,
        description: "Pay with your credit card",
        img: StripeLogo,
    },
];

type PaymentButtonProps = {
    cartId?: string;
    isPending: boolean;
};

export function PaymentButton({ cartId, isPending }: PaymentButtonProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

    return (
        <div className="divide-y divide-muted">
            {paymentMethods.map((method) => {
                const PaymentGate = method.component;

                return (
                    <div
                        key={method.id}
                        className="py-4"
                        onClick={() => setSelectedMethod(method.id)}
                    >
                        <button
                            type="button"
                            disabled={isPending}
                            className="flex text-left px-3 gap-3 w-full cursor-pointer"
                        >
                            <span
                                className={clsx(
                                    "w-5 h-5 rounded-full border border-muted mt-1 flex items-center justify-center shrink-0",
                                    selectedMethod === method.id &&
                                        "!border-dark"
                                )}
                            >
                                <div
                                    className={clsx(
                                        "w-2 h-2 rounded-full",
                                        selectedMethod === method.id &&
                                            "bg-dark "
                                    )}
                                />
                            </span>
                            <div className="flex flex-col w-full">
                                <span className="font-bold">
                                    Pay with {method.name}
                                </span>
                                <span className="text-dark/60 text-sm font-normal">
                                    {method.description}
                                </span>
                            </div>
                            <div className="self-start shrink-0">
                                <Image
                                    src={method.img}
                                    alt={method.name}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                        </button>
                        {selectedMethod === method.id && (
                            <PaymentGate
                                cartId={cartId}
                                isPending={isPending}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
