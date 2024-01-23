import Image from "next/image";
import type { CartItem as CartItemProps } from "../../app/product/types";

export const CartItem = ({ imageUrl, name, childrenItems }: CartItemProps) => {
    return (
        <div className="border p-6 rounded-lg">
            <div className="flex gap-4">
                <div className="w-28 h-28  rounded bg-gray-100 border-solid">
                    <img src={imageUrl} alt="Product image" />
                </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 pt-2 pb-2">
                {name}
            </h3>
            <ul className="list-type-none">
                {childrenItems.map((item) => {
                    return (
                        <li key={item.sku}>
                            <div className="flex items-center mb-0.5 gap-1">
                                <Image
                                    src={item.imageUrl}
                                    alt="Item image"
                                    width="60"
                                    height="60"
                                    className="w-10 h-10 object-contain border rounded "
                                />
                                <div className="text-sm text-gray-600">
                                    {item.name}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
