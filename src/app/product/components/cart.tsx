type CartProps = {
    isOpen: boolean;
};

export const Cart = ({ isOpen }: CartProps) => {
    return (
        <div
            className={`bg-white absolute w-full h-full top-0 left-full transition-all ${
                isOpen ? "left-0" : ""
            }`}
        ></div>
    );
};
