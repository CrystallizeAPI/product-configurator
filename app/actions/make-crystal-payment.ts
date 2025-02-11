"use server";

import { storage } from "@/core/storage.server";
import { crystalPaymentHandler } from "@/use-cases/payments/crystal";

export const makeCrystalPayment = async () => {
    const cartId = await storage.getCartId();
    let paymentId: string | undefined = undefined;

    if (!cartId) {
        return null;
    }

    try {
        const payment = await crystalPaymentHandler(cartId);
        paymentId = payment?.id;
    } catch (error) {
        console.error("Error making payment", error);
    }

    if (!!paymentId) {
        await storage.setCartId("");
    }

    return paymentId;
};
