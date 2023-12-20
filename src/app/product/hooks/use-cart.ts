import type { Option, Variant } from "@/use-cases/contracts/product";
import type { Skus, CartItem } from "../types";

type UseCartProps = {
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
};

export const uesCart = ({ currentVariant, options, skus }: UseCartProps) => {
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
            childrenItems,
        },
    ];

    return {
        cartItems,
        price: {
            value: [
                currentVariant.price.value ?? 0,
                saddle?.price.value ?? 0,
                grip?.price.value ?? 0,
                frontRack?.price.value ?? 0,
                rearRack?.price.value ?? 0,
                bag?.price.value ?? 0,
            ].reduce((acc, price) => acc + price, 0),
            currency: currentVariant.price.currency,
        },
    };
};
