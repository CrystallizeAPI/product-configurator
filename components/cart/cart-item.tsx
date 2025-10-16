import { Cart } from "@crystallize/schema/shop";
import Image from "next/image";

type CartItemProps = {
    items: Cart["items"];
};

export const CartItem = ({ items }: CartItemProps) => {
    const [main, ...bom] = items ?? [];

    return (
        <div className="border p-6 rounded-lg">
            <div className="flex gap-4">
                <div className="w-28 h-28  rounded bg-gray-100 border-solid">
                    <img src={main.images?.[0]?.url} alt="Product image" />
                </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 pt-2 pb-2">
                {main.name}
            </h3>
            <ul className="list-type-none">
                {bom.map((item) => {
                    const src = item.images?.[0].url;
                    return (
                        <li key={item.variant.sku}>
                            <div className="flex items-center mb-0.5 gap-1">
                                {!!src && (
                                    <Image
                                        src={src}
                                        alt="Item image"
                                        width="60"
                                        height="60"
                                        className="w-10 h-10 object-contain border rounded "
                                    />
                                )}
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
