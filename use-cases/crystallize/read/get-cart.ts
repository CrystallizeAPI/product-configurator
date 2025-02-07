'use server';

type Data = {
    cart: {
        id: string;
        items: {
            name: string;
            variant: {
                sku: string;
            };
            price: {
                net: string;
                gross: string;
                currency: string;
            };
            images: {
                url: string;
                width: string;
                height: string;
            }[];
        }[];
        total: { gross: number; currency: string };
    };
};

export async function getCart(
    shopApiClient: (query: string, variables: Record<string, any>) => Promise<Data>,
    id: string,
) {
    const query = `#graphql
    query GET_CART($id: UUID!) {
        cart(id: $id) {
            id
            total {
              gross
              currency
            }
            items {
              name
              variant {
                sku
              }
              price {
                net
                gross
                currency
              }
              images {
                url
                width
                height
              }
            }
        }
    }
  `;

    const variables = { id };
    const data = await shopApiClient(query, variables);
    return data.cart;
}
