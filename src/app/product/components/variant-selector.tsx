"use client";

import { useUrlState } from '../utils/use-url-state'
import type { Skus } from '../types'
import { getColorConfig } from '../utils/get-data-from-model'

type VariantSelectorProps = {
  variant: any
}

export default function VariantSelector({ variant }) {
  const [skus, setSkus] = useUrlState<Skus>()

  if (!variant) {
    return null;
  }

  const { hex } = getColorConfig(variant)

  return (
    <div
      className={`bg-white shadow cursor-pointer flex flex-col items-start  py-2 px-2 rounded-sm border border-solid ${
        skus.v === variant.sku ? "border-green-500 " : "border-transparent"
      }`}
      onClick={() => setSkus({ v: variant.sku }) }
    >
      <div
        style={{ background: `#${hex}` }}
        className="w-full aspect-square rounded-sm"
      />
      <div className="pt-2 text-[13px] flex text-left w-1/2">
        {variant.name}
      </div>
    </div>
  );
}
