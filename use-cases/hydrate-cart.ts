import { storage } from "@/core/storage.server";
import { crystallizeClient } from "@/core/crystallize-client.server";
import { FETCH_CART, PRICE_FRAGMENT } from "./fetch-cart";
import { ServerCart } from "./contracts/product";

export const hydrateCart = async (
    id: string | undefined,
    items: { sku: string; quantity: number }[]
): Promise<ServerCart> => {
    const input = { items, ...(!!id && { id }) };

    try {
        const data = await crystallizeClient.shopCartApi(
            `#graphql
            mutation HYDRATE_CART($input: CartInput!){ hydrate(input: $input) { ${FETCH_CART} } }
            ${PRICE_FRAGMENT}
            `,
            { input }
        );
        await storage.setCartId(data.hydrate.id);
        return data.hydrate;
    } catch (exception) {
        console.error("addSkuItemToCart without cartId", exception);
        throw exception;
    }
};
