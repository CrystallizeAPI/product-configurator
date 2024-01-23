"use server";

import { apiClient } from "@/core";
import { createOrder } from "@/use-cases/crystallize";
import { CartItem } from "@/app/product/types";

export async function placeOrder(cartItem: CartItem, formData: FormData) {
    const fullName = formData.get("name") as string;
    const [firstName, lastName] = fullName.split(" ");
    const email = formData.get("email");
    const street = formData.get("address");
    const city = formData.get("city");
    const country = formData.get("country");
    const postalCode = formData.get("zip");

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
    const parts = cartItem.childrenItems.flatMap((item) => ({
        name: item.name,
        sku: item.sku,
        quantity: 1,
        imageUrl: item.imageUrl,
        price: item.price,
        meta: {
            key: "type",
            value: "Composable",
        },
    }));

    const orderCart = [
        {
            name: cartItem.name,
            sku: cartItem.sku,
            quantity: 1,
            imageUrl: cartItem.imageUrl,
            price: cartItem.price,
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

    const client = await apiClient();
    const { id } = await createOrder(client, { customer, cart: orderCart });
    console.log(id);
    return id;
}
