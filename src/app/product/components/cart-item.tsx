import Image from "next/image";
import type { CartItem as CartItemProps } from "../types";

export const CartItem = ({ imageUrl, name, childrenItems }: CartItemProps) => {
    return (
        <div className="flex">
            <div className="w-28 h-28 rounded border border-solid border-gray-400">
                <img src={imageUrl} alt="Product image" />
            </div>
            <div className="pl-4">
                <h3 className="text-xl font-medium">{name}</h3>
                <ul className="list-type-none">
                    {childrenItems.map((item) => {
                        return (
                            <li key={item.sku}>
                                <div className="flex items-center">
                                    <Image
                                        src={item.imageUrl}
                                        alt="Item image"
                                        width="40"
                                        height="40"
                                        className="w-8 h-8 object-contain"
                                    />
                                    <div className="text-xs font-medium">
                                        {item.name}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
