import type { Option, Variant } from "@/use-cases/contracts/product";
import { createOrder } from "@/use-cases/crystallize/write/create-order";
import type { Skus, CartItem } from "../types";
import { useEffect, useState } from "react";
import { CART_ID } from "../utils/const";
import { getCart } from "@/actions/get-cart";

type UseCartProps = {
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
    onClose: () => void;
};

type Cart = { cartItem: CartItem; price: string };

export const useCart = ({
    currentVariant,
    options,
    skus,
    onClose,
}: UseCartProps) => {
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    const [cart, setCart] = useState<Cart | undefined>();
    const cartId = localStorage.getItem(CART_ID);

    useEffect(() => {
        (async () => !!cartId && setCart(await getCart(cartId)))();
    }, [cartId]);

    if (!currentVariant || !options || !skus) {
        return {};
    }

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
        const parts = cart?.cartItem.childrenItems.flatMap((item) => ({
            name: item.name,
            sku: item.sku,
            quantity: 1,
            imageUrl: item.imageUrl,
            price: {
                gross: item.price.value,
                net: item.price.value,
                currency: currentVariant.price.currency,
            },
            meta: {
                key: "type",
                value: "Composable",
            },
        }));
        const orderCart = [
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
                meta: [
                    {
                        key: "type",
                        value: "Main",
                    },
                    {
                        key: "bom",
                        value: parts?.map(({ sku }) => sku).join("_"),
                    },
                ],
            },
            ...(parts ?? []),
        ];

        const { id } = await createOrder({ customer, cart: orderCart });
        setOrderId(id);
    };

    const onCloseCart = () => {
        onClose();
        setOrderId(undefined);
    };

    return {
        onSubmit,
        cartItem: cart?.cartItem,
        price: cart?.price,
        orderId,
        onCloseCart,
    };
};
