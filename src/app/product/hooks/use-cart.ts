import type { Option, Variant } from "@/use-cases/contracts/product";
import { createOrder } from "@/use-cases/crystallize/write/create-order";
import type { Skus, CartItem } from "../types";
import { useCallback, useState } from "react";

type UseCartProps = {
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
    onClose: () => void;
};

export const useCart = ({
    currentVariant,
    options,
    skus,
    onClose,
}: UseCartProps) => {
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    if (!currentVariant || !options || !skus) {
        return {};
    }
    const childrenItems: CartItem["childrenItems"] = [];
    const saddle = skus.saddle
        ? currentVariant.saddles?.find((saddle) => saddle.sku === skus.saddle)
        : undefined;
    const grip = skus.grip
        ? currentVariant.grips?.find((grip) => grip.sku === skus.grip)
        : undefined;
    const frontRack = skus.frontRack
        ? options.find((opt) => opt.id === "frontRack")
        : undefined;
    const rearRack = skus.rearRack
        ? options.find((opt) => opt.id === "rearRack")
        : undefined;
    const bag = skus.leatherBag
        ? options.find((opt) => opt.id === "leatherBag")
        : undefined;

    !!saddle && childrenItems.push(saddle);
    !!grip && childrenItems.push(grip);
    !!frontRack && childrenItems.push(frontRack);
    !!rearRack && childrenItems.push(rearRack);
    !!bag && childrenItems.push(bag);

    const cartItems: CartItem[] = [
        {
            name: currentVariant?.name,
            imageUrl: currentVariant.imageUrl,
            price: currentVariant.price,
            childrenItems,
        },
    ];

    const onSubmit = async (formaData: FormData) => {
        const fullName = formaData.get("name") as string;
        const [firstName, lastName] = fullName.split(" ");
        const email = formaData.get("email");
        const street = formaData.get("address");
        const city = formaData.get("city");
        const country = formaData.get("country");
        const postalCode = formaData.get("zip");

        const customer = {
            firstName,
            ...(lastName && { lastName }),
            addresses: [
                {
                    street,
                    email,
                    country,
                    postalCode,
                    city,
                    type: "delivery",
                },
            ],
        };
        const cart = [
            {
                name: currentVariant.name,
                sku: currentVariant.sku,
                quantity: 1,
                imageUrl: currentVariant.imageUrl,
                price: {
                    gross: currentVariant.price.value,
                    net: currentVariant.price.value,
                    currency: currentVariant.price.currency,
                },
            },
            ...cartItems.flatMap((cartItem) =>
                cartItem.childrenItems.flatMap((item) => ({
                    name: item.name,
                    sku: item.sku,
                    quantity: 1,
                    imageUrl: item.imageUrl,
                    price: {
                        gross: item.price.value,
                        net: item.price.value,
                        currency: currentVariant.price.currency,
                    },
                }))
            ),
        ];

        const { id } = await createOrder({ customer, cart });
        setOrderId(id);
    };

    const price = {
        value: [
            currentVariant.price.value ?? 0,
            saddle?.price.value ?? 0,
            grip?.price.value ?? 0,
            frontRack?.price.value ?? 0,
            rearRack?.price.value ?? 0,
            bag?.price.value ?? 0,
        ].reduce((acc, price) => acc + price, 0),
        currency: currentVariant.price.currency,
    };

    const onCloseCart = () => {
        onClose();
        setOrderId(undefined);
    };

    return {
        onSubmit,
        cartItems,
        price,
        orderId,
        onCloseCart,
    };
};
