import { Image } from '@crystallize/reactjs-components';
import type { CartItem as CartItemProps } from '@/use-cases/contracts/product';

export const CartItem = ({ imageUrl, name, childrenItems }: CartItemProps) => {
    return (
        <div className="border-gray-200 border p-6 rounded-lg">
            <div className="flex gap-4">
                <div className="w-28 h-28  rounded bg-gray-100 border-solid">
                    <Image src={imageUrl} alt="Product image" />
                </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 pt-2 pb-2">{name}</h3>
            <ul className="list-type-none">
                {childrenItems.map((item) => {
                    return (
                        <li key={item.sku}>
                            <div className="flex items-center mb-0.5 gap-1">
                                <div className="w-10 h-10 border border-gray-200 overflow-hidden rounded">
                                    <Image
                                        src={item.imageUrl}
                                        width={60}
                                        height={60}
                                        className="crystallize-image-contain"
                                        alt={item.name}
                                    />
                                </div>
                                <div className="text-sm text-gray-600">{item.name}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
