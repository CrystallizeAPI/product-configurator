import { useCartContext } from "@/context/cart-context";
import type { Option, Variant } from "@/use-cases/contracts/product";
import { formatPrice } from "@/utils/format-price";

import { useTempCart } from "../hooks/use-temp-cart";

type PriceBarProps = {
    currentVariant?: Variant;
    options?: Option[];
};

export const PriceBar = ({ currentVariant, options }: PriceBarProps) => {
    const { setIsOpen, onUpdateCart, isLoading } = useCartContext();
    const cart = useTempCart({ currentVariant, options });

    return (
        <div className="flex flex-col  justify-between items-center">
            <h3 className="flex flex-col w-full border-t py-4">
                <span className="text-sm font-medium text-gray-600">Total</span>
                <span className="text-3xl font-medium">
                    {formatPrice({
                        value: cart?.total?.gross,
                        currency: cart?.total?.currency,
                    })}
                </span>
            </h3>
            <form action={onUpdateCart} className="w-full">
                <input
                    type="hidden"
                    name="items"
                    value={JSON.stringify(cart?.items) ?? ""}
                />
                <button
                    type="submit"
                    onClick={() => setIsOpen?.(true)}
                    disabled={isLoading}
                    className="px-8 py-4 rounded-xl w-full bg-gray-800 font-medium text-white"
                >
                    Add to cart
                </button>
            </form>
        </div>
    );
};
