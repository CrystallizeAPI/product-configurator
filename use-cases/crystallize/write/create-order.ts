'use server';

import type { ClientInterface } from '@crystallize/js-api-client';

type Data = {
    id: string;
};

export async function createOrder(apiClient: ClientInterface, input: any): Promise<Data> {
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
