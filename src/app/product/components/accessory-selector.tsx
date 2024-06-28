import Image from "next/image";
import type { Option } from "@/use-cases/contracts/product";

import type { Skus } from "../types";
import { useAccessories } from "../hooks/use-accessories";

type AccessoriesSelectorProps = {
    options?: Option[];
    skus: Skus;
    onChange: ({ type, value }: { type: "options"; value?: string }) => void;
};

export const AccessorySelector = ({
    options,
    skus,
    onChange,
}: AccessoriesSelectorProps) => {
    const { isBagDisabled, onOptionChange, getIsSelected } = useAccessories({
        skus,
        options,
        onChange,
    });

    return (
        <div className="flex flex-col gap-1">
            {options?.map((option) => {
                const disabled = option?.id === "leatherBag" && isBagDisabled;
                const isSelected = getIsSelected(option.sku);
                return (
                    <div
                        key={option?.id}
                        role="button"
                        onClick={() => !disabled && onOptionChange(option)}
                        className={`bg-white overflow-hidden border border-solid py-4 rounded-lg hover:bg-gray-50 flex items-center ${
                            isSelected ? "border-gray-400" : "border-gray-200"
                        } ${
                            disabled
                                ? "opacity-50 cursor-default"
                                : "cursor-pointer"
                        }`}
                    >
                        <div className="w-28 flex justify-center">
                            <Image
                                className="w-28"
                                src={option.imageUrl}
                                alt={option.name}
                                width="128"
                                height="86"
                                loading="eager"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-base text-gray-800">
                                {option.name}
                            </div>
                            <div className="text-sm text-gray-600">
                                + €{option.price.value}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
