import type { BaseItem } from "./contracts/product";

export const getNextCart = (items: BaseItem[]) => {
    const gross = items.reduce(
        (acc, item) => acc + (item.price?.gross ?? 0),
        0
    );
    return { items, total: { gross, currency: items[0].price?.currency } };
};
