export type CartItemProps = {
    imageUrl: string;
    name: string;
    childrenItems: {
        name: string;
        imageUrl: string;
        sku: string;
    }[];
};

export const CartItem = ({ imageUrl, name, childrenItems }: CartItemProps) => {
    return (
        <div className="flex">
            <div className="w-20 h-20 rounded border border-solid border-gray-400">
                <img src={imageUrl} alt="Product image" />
            </div>
            <div>
                <h3>{name}</h3>
                {childrenItems.map((item) => {
                    return (
                        <div key={item.sku}>
                            <div>{item.name}</div>
                            <img src={item.imageUrl} alt="Item image" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
