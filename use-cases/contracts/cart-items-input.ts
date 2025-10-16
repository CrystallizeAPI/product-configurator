export type CartItemSlimInput = {
    variant: { sku: string };
    quantity?: number
}

export type CartItemInput = CartItemSlimInput & {
    name?: string;
    images?: { url: string }[];
    price?: {
        net: number;
        gross: number;
        currency: string;
    };
};
