import { usePriceBar, type PriceBarProps } from '../app/product/hooks/use-price-bar';

export const PriceBar = (props: PriceBarProps) => {
    const { price, onSaveCartClick } = usePriceBar(props);

    return (
        <div className="flex flex-col justify-between items-center">
            <h3 className="flex flex-col w-full border-t border-gray-200 py-4">
                <span className="text-sm font-medium text-gray-600">Total</span>
                <span className="text-3xl font-medium">{price}</span>
            </h3>
            <button
                onClick={onSaveCartClick}
                className="px-8 py-4 rounded-xl w-full bg-gray-800 font-medium text-white cursor-pointer"
            >
                Add to cart
            </button>
        </div>
    );
};
