export type CartInput = {
    id?: string;
    items: { sku: string; quantity: number }[];
};
