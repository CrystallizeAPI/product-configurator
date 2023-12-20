import { CartCustomer } from "./cart-customer";
import { CartItem } from "./cart-item";
import type { CartItem as CartItemProps } from "../types";
import { priceFormatter } from "../utils/format-price";
import { Price } from "@/use-cases/contracts/product";

type CartFormProps = {
    onSubmit?: (formData: FormData) => Promise<unknown>;
    cartItems?: CartItemProps[];
    price?: Price;
};

export const CartForm = ({ onSubmit, cartItems, price }: CartFormProps) => {
    return (
        // @ts-expect-error
        <form action={onSubmit} className="flex flex-col h-full">
            <h2 className="font-medium text-xl mx-12 my-10">
                Your shopping cart
            </h2>
            <div className="mx-12 flex-1">
                {cartItems?.map((item) => {
                    return <CartItem key={item.name} {...item} />;
                })}
            </div>
            <CartCustomer />
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
        </form>
    );
};
