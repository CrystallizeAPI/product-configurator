import Image from "next/image";
import type { Variant } from "@/use-cases/contracts/product";

import type { Skus } from "../types";

type SaddleSelectorProps = {
    saddles: Variant["saddles"];
    skus: Skus;
    onChange: (sku: string) => void;
};

export const SaddleSelector = ({
    saddles,
    skus,
    onChange,
}: SaddleSelectorProps) => {
    return (
        <div className="flex flex-col gap-1">
            {saddles?.map((saddle) => (
                <div
                    role="button"
                    key={saddle.sku}
                    onClick={() => onChange(saddle.sku)}
                    className={`bg-white overflow-hidden border border-solid cursor-pointer shadow rounded flex items-center ${
                        skus.saddle === saddle.sku
                            ? "border-accent"
                            : "border-transparent"
                    }`}
                >
                    <div className="w-16">
                        <Image
                            src={saddle.imageUrl}
                            alt={saddle.name}
                            width="64"
                            height="43"
                            loading="eager"
                        />
                    </div>
                    <div className="text-[13px]">{saddle.name}</div>
                </div>
            ))}
        </div>
    );
};
