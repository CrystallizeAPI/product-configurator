import { Image } from "@crystallize/reactjs-components";
import type { BaseItem } from "@/use-cases/contracts/product";

type CartItemProps = {
    items: BaseItem[];
};

export const CartItem = ({ items }: CartItemProps) => {
    const [mainItem, ...composableItems] = items;

    return (
        <div className="border-muted border p-6 rounded-lg">
            <div className="flex gap-4">
                <div className="w-28 h-28 rounded bg-gray-100 border-solid">
                    <Image {...mainItem.image} />
                </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 pt-2 pb-2">
                {mainItem.name}
            </h3>
            <ul className="list-type-none">
                {composableItems.map((item) => {
                    return (
                        <li key={item.sku}>
                            <div className="flex items-center mb-0.5 gap-1">
                                <div className="w-10 h-10 border border-muted overflow-hidden rounded">
                                    <Image
                                        {...item.image}
                                        className="crystallize-image-contain"
                                    />
                                </div>
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
