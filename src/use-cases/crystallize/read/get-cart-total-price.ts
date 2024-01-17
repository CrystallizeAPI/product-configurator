"use server";

type Data = {
    data: {
        hydrate: { id: string; total: { gross: number; currency: string } };
    };
};

export async function getCartTotalPrice(
    shopApiClient: (
        query: string,
        variables: Record<string, any>
    ) => Promise<Data>,
    input: { items: { sku: string }[] }
) {
    const query = `#graphql
    mutation GET_CART_TOTAL_PRICE($input: CartInput!) {
        hydrate(input: $input) {
            id
            total {
                gross
                currency
            }
        }
    }
  `;
    const variables = { input };
    const { data } = await shopApiClient(query, variables);
    return data.hydrate;
}
