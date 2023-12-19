import { usePriceBar, type PriceBarProps } from "../hooks/use-price-bar";

export const PriceBar = (props: PriceBarProps) => {
    const { price, onSaveCartClick } = usePriceBar(props);

    return (
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Price: {price}</h3>
            <button
                onClick={onSaveCartClick}
                className="px-4 py-2 rounded bg-accent font-medium text-white"
            >
                Add to cart
            </button>
        </div>
    );
};
