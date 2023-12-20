"use server";

import type { ClientInterface } from "@crystallize/js-api-client";

export async function createOrder(apiClient: ClientInterface, input: any) {
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
