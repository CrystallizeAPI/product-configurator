import Image from "next/image";
import type { Option } from "@/use-cases/contracts/product";

import type { Skus } from "../types";

type AccessoriesSelectorProps = {
    options?: Option[];
    skus: Skus;
    onChange: ({ type, value }: { type: Option["id"]; value?: string }) => void;
};

export const AccessorySelector = ({
    options,
    skus,
    onChange,
}: AccessoriesSelectorProps) => {
    return (
        <div className="flex flex-col gap-1">
            {options?.map((option) => {
                const isSelected = !!skus[option.id];
                const isBagDisabled =
                    option.id === "leatherBag" &&
                    skus.grip &&
                    skus.grip !== "natural-leather";

                return (
                    <div
                        key={option.id}
                        role="button"
                        onClick={() =>
                            !isBagDisabled &&
                            onChange({
                                type: option.id,
                                value: isSelected ? undefined : option.sku,
                            })
                        }
                        className={`bg-white overflow-hidden border border-solid shadow rounded flex items-center ${
                            isSelected
                                ? "border-green-500 "
                                : "border-transparent"
                        } ${
                            isBagDisabled
                                ? "opacity-50 cursor-default"
                                : "cursor-pointer"
                        }`}
                    >
                        <div className="w-16 flex justify-center">
                            <Image
                                className="w-16"
                                src={option.imageUrl}
                                alt={option.name}
                                width="64"
                                height="43"
                                loading="eager"
                            />
                        </div>
                        <div className="text-[13px]">
                            <span>{option.name}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
