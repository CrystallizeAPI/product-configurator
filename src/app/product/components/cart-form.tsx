import { CartCustomer } from "./cart-customer";
import { CartItem } from "./cart-item";
import type { CartItem as CartItemProps } from "../types";

type CartFormProps = {
    onSubmit?: (formData: FormData) => Promise<unknown>;
    cartItem?: CartItemProps;
    price?: string;
};

export const CartForm = ({ onSubmit, cartItem, price }: CartFormProps) => {
    return (
        <form
            className="flex flex-col h-full"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(new FormData(e.currentTarget));
            }}
        >
            <h2 className="font-medium text-gray-800 pb-8 text-2xl py-10 px-12">
                Your shopping cart
            </h2>
            <div className="mx-12">
                {!!cartItem && <CartItem key={cartItem.name} {...cartItem} />}
            </div>
            <div className=" px-12">
                <div className="mt-12">
                    <CartCustomer />
                    <div className="px-12  bg-gray-100 rounded-xl py-6 mt-12">
                        <div className="flex flex-col  justify-between items-center">
                            <h3 className="flex flex-col w-full py-4">
                                <span className="text-sm font-medium text-gray-600">
                                    Total
                                </span>
                                <span className="text-3xl font-medium">
                                    {price}
                                </span>
                            </h3>
                            <button
                                type="submit"
                                className="px-8 py-4 rounded-xl w-full bg-gray-800 font-medium text-white"
                            >
                                Place order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
