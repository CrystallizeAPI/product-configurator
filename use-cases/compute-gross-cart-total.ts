import { Cart } from "@crystallize/schema/shop";

type MinimumCart = {
    total?: Cart['total'];
    items?: {
        price?: {
            gross?: number;
        };
    }[];
};

export const computeGrossCartTotal = <T extends MinimumCart>(cart: T): T => {
    return {
        ...cart,
        total: {
            ...cart.total,
            gross:
                cart?.items?.reduce(
                    (acc, item) => acc + (item.price?.gross ?? 0),
                    0
                ) ?? 0,
        },
    };
};
