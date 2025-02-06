'use client';

import { useState } from 'react';
import clsx from 'classnames';
import { CartForm } from './cart-form';
import { useCart } from './use-cart';
import { OrderConfirmation } from './order-confirmation';
import { CART_ID } from '../../utils/const';

type CartProps = {
    onClose: () => void;
};

export const CartBody = ({ onClose }: CartProps) => {
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    const { isLoading, cartItem, price } = useCart();

    const onCloseCart = () => {
        setOrderId(undefined);
        onClose();
    };

    if (isLoading) {
        return null;
    }

    return (
        <>
            <button
                className={clsx(
                    'absolute top-6 right-6 rounded cursor-pointer',
                    'border border-transparent hover:border-gray-200 p-2 bg-gray-100',
                )}
                onClick={onCloseCart}
            >
                <svg height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>

            {!cartItem ? (
                <div className="grid w-full h-full place-content-center text-base font-medium text-gray-500">
                    <h2 className="font-medium text-gray-800 pb-8 text-2xl py-7 px-12">Your cart is empty</h2>
                </div>
            ) : !!orderId ? (
                <OrderConfirmation orderId={orderId} onCloseCart={onCloseCart} />
            ) : (
                <CartForm
                    cartItem={cartItem}
                    price={price}
                    onOrderPlaced={(id) => {
                        localStorage.removeItem(CART_ID);
                        setOrderId(id);
                    }}
                />
            )}
        </>
    );
};
