import Image from "next/image";
import type { Variant } from "@/use-cases/contracts/product";

import type { Skus } from "../types";

type GripSelectorProps = {
    grips: Variant["grips"];
    skus: Skus;
    onChange: (sku: string) => void;
};

export const GripSelector = ({ grips, skus, onChange }: GripSelectorProps) => {
    return (
        <div className="flex flex-col gap-1">
            {grips?.map((grip) => (
                <div
                    role="button"
                    key={grip.sku}
                    onClick={() => onChange(grip.sku)}
                    className={`bg-white overflow-hidden border border-solid cursor-pointer shadow rounded flex items-center ${
                        skus.grip === grip.sku
                            ? "border-green-500 "
                            : "border-transparent"
                    }`}
                >
                    <div className="w-16 flex justify-center">
                        <Image
                            className="w-10"
                            src={grip.imageUrl}
                            alt={grip.name}
                            width="40"
                            height="50"
                            loading="eager"
                        />
                    </div>
                    <div className="text-[13px]">{grip.name}</div>
                </div>
            ))}
        </div>
    );
};
