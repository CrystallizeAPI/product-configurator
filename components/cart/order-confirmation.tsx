type OrderConfirmationProps = {
    orderId: string;
    onCloseCart: () => void;
};

export const OrderConfirmation = ({ orderId, onCloseCart }: OrderConfirmationProps) => {
    return (
        <div className="p-2 flex items-center justify-center flex-col h-full w-full">
            <h1 className="font-bold text-3xl">Order confirmation</h1>
            <p className="mt-4">We&apos;ve received your order.</p>
            <p>Order ID: {orderId}.</p>

            <div className="mt-32">
                <button onClick={onCloseCart} className="px-4 py-2 rounded bg-accent font-medium text-white">
                    Close cart
                </button>
            </div>
        </div>
    );
};
