import type { Option, Variant } from "@/use-cases/contracts/product";
import { CartForm } from "./cart-form";
import type { Skus } from "../types";
import { uesCart } from "../hooks/use-cart";
import { CartItem } from "./cart-item";
import { priceFormatter } from "../utils/format-price";

type CartProps = {
    isOpen: boolean;
    onClose: () => void;
    currentVariant?: Variant;
    options?: Option[];
    skus?: Skus;
};

export const Cart = ({
    isOpen,
    onClose,
    currentVariant,
    options,
    skus,
}: CartProps) => {
    const { cartItems, price } = uesCart({ currentVariant, options, skus });

    return (
        <form
            className={`bg-white absolute w-full h-full top-0 transition-all flex flex-col ${
                isOpen ? "left-0" : "left-full"
            }`}
        >
            {isOpen && (
                <>
                    <button
                        className="absolute top-2 right-2 p-2"
                        onClick={onClose}
                    >
                        <svg height="24" viewBox="0 -960 960 960" width="24">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </button>

                    <h2 className="font-medium text-xl mx-12 my-10">
                        Your shopping cart
                    </h2>
                    <div className="mx-12 flex-1">
                        {cartItems?.map((item) => {
                            return <CartItem key={item.name} {...item} />;
                        })}
                    </div>
                    <CartForm />
                    <div className="flex justify-between shrink-0 items-center mx-12 mt-8 mb-4">
                        <h3 className="text-xl font-medium">
                            Total price: {priceFormatter(price)}
                        </h3>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-accent font-medium text-white"
                        >
                            Buy
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};
