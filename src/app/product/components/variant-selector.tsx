"use client";

export default function VariantSelector({ variant, changeFrame, current }) {
  if (!variant || !changeFrame || !current) return null;
  const paint = variant.components.find((c) => c.id === "frame-color")?.content
    ?.productVariants?.[0];
  const paintAttributes = paint.components.find((p) => p.id === "color-config")
    ?.content?.chunks?.[0];
  const hex = paintAttributes.find((h) => h.id === "hex")?.content?.text;
  return (
    <div
      className={`bg-white shadow cursor-pointer flex flex-col items-start  py-2 px-2 rounded-sm border border-solid ${
        current.variant?.sku === variant.sku
          ? "border-green-500 "
          : "border-transparent"
      }`}
      onClick={() =>
        changeFrame(
          variant,
          paintAttributes.find((h) => h.id === "3d-variant-attribute")?.content
            ?.text
        )
      }
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
