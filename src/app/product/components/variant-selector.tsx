"use client";

import type { Skus } from "../types";
import type { Variant } from "@/use-cases/contracts/product";

type VariantSelectorProps = {
    variant: Variant;
    skus: Skus;
    onChange: (value: string) => void;
};

export default function VariantSelector({
    skus,
    variant,
    onChange,
}: VariantSelectorProps) {
    return (
        <div
            onClick={() => onChange(variant.sku)}
            className={`bg-white shadow cursor-pointer flex flex-col items-start  py-2 px-2 rounded-sm border border-solid ${
                skus.v === variant.sku ? "border-accent" : "border-transparent"
            }`}
        >
            <div
                style={{ background: variant.frameColor?.hex }}
                className="w-full aspect-square rounded-sm"
            />
            <div className="pt-2 text-[13px] flex text-left w-1/2">
                {variant.name}
            </div>
        </div>
    );
}
