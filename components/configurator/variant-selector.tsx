"use client";

import type { Skus, Variant } from "@/use-cases/contracts/product";

type VariantSelectorProps = {
    variant: Variant;
    skus: Skus;
    onChange: (value: string) => void;
};

export function VariantSelector({
    skus,
    variant,
    onChange,
}: VariantSelectorProps) {
    return (
        <div
            onClick={() => onChange(variant.sku)}
            className={`border  border-solid cursor-pointer flex flex-col items-start  hover:bg-gray-50 py-2 px-2 rounded-lg ${
                skus.v === variant.sku ? "border-gray-400" : "border-muted"
            }`}
        >
            <div
                style={{ background: variant.frameColor?.hex }}
                className="w-full aspect-square rounded-lg"
            />
            <div className="pt-2 text-[12px] font-normal text-gray-600 flex text-left w-1/2">
                {variant.name}
            </div>
        </div>
    );
}
