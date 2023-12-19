type CartProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Cart = ({ isOpen, onClose }: CartProps) => {
    return (
        <div
            className={`bg-white absolute w-full h-full top-0 transition-all ${
                isOpen ? "left-0" : "left-full"
            }`}
        >
            <button className="absolute top-2 right-2 p-2" onClick={onClose}>
                <svg height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>

            <h2 className="font-medium text-xl mx-12 my-10">
                Your shopping cart
            </h2>
        </div>
    );
};
