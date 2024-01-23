export const priceFormatter = (price?: {
    value?: number;
    currency?: string;
}) => {
    if (!price || typeof price.value !== "number" || !price.currency) {
        return "0";
    }

    return price.value.toLocaleString("en-US", {
        style: "currency",
        currency: price.currency,
    });
};
