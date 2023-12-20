"use server";

import { createClient } from "@crystallize/js-api-client";

const apiClient = createClient({
    tenantIdentifier: "product-configurator",
    tenantId: "6566eee5c53426877c8ad16a",
    accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
    accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
});

export async function createOrder(input: any) {
    const query = `#graphql
    mutation ($input: CreateOrderInput!) {
      orders {
        create(input: $input) {
          id
        }
      }
    }
  `;

    const options = { input };

    const { orders } = await apiClient.orderApi(query, options);
    return orders.create;
}
