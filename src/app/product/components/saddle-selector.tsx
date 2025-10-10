import Image from "next/image";
import type { Variant } from "@/use-cases/contracts/product";

import type { Skus } from "../types";

type SaddleSelectorProps = {
    saddles: Variant["saddles"];
    skus: Skus;
    onChange: (sku: string) => void;
};

export const SaddleSelector = ({ saddles, skus, onChange }: SaddleSelectorProps) => {
    return (
        <div className="flex flex-col gap-2">
            {saddles?.map((saddle) => (
                <div
                    role="button"
                    key={saddle.sku}
                    onClick={() => onChange(saddle.sku)}
                    className={`bg-white overflow-hidden border border-solid cursor-pointer rounded-lg flex items-center hover:bg-gray-50 ${
                        skus.saddle === saddle.sku ? "border-gray-400" : "border-gray-200"
                    }`}
                >
                    <div className="w-28">
                        <Image src={saddle.imageUrl} alt={saddle.name} width="128" height="86" loading="eager" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px] text-gray-800">{saddle.modelAttribute}</div>
                        <div className="text-[12px] text-gray-500">{saddle.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
