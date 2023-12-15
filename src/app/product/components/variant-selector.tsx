"use client";

import { useUrlState } from "../utils/use-url-state";
import type { Skus } from "../types";
import type { Variant } from "@/use-cases/contracts/product";

type VariantSelectorProps = {
    variant: Variant;
};

export default function VariantSelector({ variant }: VariantSelectorProps) {
    const [skus, setSkus] = useUrlState<Skus>();

    return (
        <div
            className={`bg-white shadow cursor-pointer flex flex-col items-start  py-2 px-2 rounded-sm border border-solid ${
                skus.v === variant.sku
                    ? "border-green-500 "
                    : "border-transparent"
            }`}
            onClick={() =>
                setSkus({
                    v: variant.sku,
                    saddle: variant.saddles?.[0].sku,
                    grip: variant.grips?.[0].sku,
                })
            }
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
