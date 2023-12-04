export const getColorConfig = (variant) => {
  const paint = variant.components.find((c) => c.id === "frame-color")?.content
    ?.productVariants?.[0];
  const paintAttributes = paint.components.find((p) => p.id === "color-config")
    ?.content?.chunks?.[0];

  const hex = paintAttributes.find((h) => h.id === "hex")?.content?.text;
  const variantAttribute = paintAttributes.find((h) => h.id === "3d-variant-attribute")?.content?.text

  return { hex, variantAttribute }
}

export const getOptions = (variant) => {
  const saddles = variant?.components.find((c) => c.id === "saddle-options")?.content?.productVariants?.map(variant => {
    const [type, _, name] = variant.name.split(' ')
    return {
      ...variant,
      code: `${name}-${type}`
    }
  })
  const grips = variant?.components.find((c) => c.id === "grip-options")?.content?.productVariants;

  return {saddles, grips}
}

