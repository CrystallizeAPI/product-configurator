import { Option, Variant } from "@/use-cases/contracts/product";
import type { Skus } from "../types";

type PriceBarProps = {
    skus: Skus;
    currentVariant: Variant | undefined;
    options: Option[] | undefined;
    onOpenCartClick: () => void;
};

const priceFormatter = (price?: { value?: number; currency?: string }) => {
    if (!price || typeof price.value !== "number" || !price.currency) {
        return "0";
    }

    return price.value.toLocaleString("en-US", {
        style: "currency",
        currency: price.currency,
    });
};

const getTotalPrice = ({
    skus,
    currentVariant,
    options,
}: Omit<PriceBarProps, "onOpenCartClick">) => {
    const framePrice = currentVariant?.price.value ?? 0;
    const saddlePrice =
        currentVariant?.saddles?.find((saddle) => saddle.sku === skus.saddle)
            ?.price.value ?? 0;
    const gripPrice =
        currentVariant?.grips?.find((grip) => grip.sku === skus.grip)?.price
            .value ?? 0;
    const frontRack = skus.frontRack
        ? options?.find((opt) => opt.sku === skus.frontRack)?.price.value ?? 0
        : 0;
    const rearRack = skus.rearRack
        ? options?.find((opt) => opt.sku === skus.rearRack)?.price.value ?? 0
        : 0;
    const bagPrice = skus.leatherBag
        ? options?.find((opt) => opt.sku === skus.leatherBag)?.price.value ?? 0
        : 0;

    return [
        framePrice,
        saddlePrice,
        gripPrice,
        frontRack,
        rearRack,
        bagPrice,
    ].reduce((acc, price) => acc + price, 0);
};

export const PriceBar = ({
    skus,
    currentVariant,
    options,
    onOpenCartClick,
}: PriceBarProps) => {
    const price = priceFormatter({
        value: getTotalPrice({ skus, currentVariant, options }),
        currency: currentVariant?.price.currency,
    });

    return (
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Price: {price}</h3>
            <button
                onClick={() => onOpenCartClick()}
                className="px-4 py-2 rounded bg-accent font-medium text-white"
            >
                Add to cart
            </button>
        </div>
    );
};
