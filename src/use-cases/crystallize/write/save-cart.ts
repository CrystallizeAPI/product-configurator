"use server";

import type { CartInput } from "../../contracts/cart";

export async function saveCart(input: CartInput) {
    const query = `
    mutation SAVE_CART($input: CartInput!){
      hydrate(input: $input) {
        id
        total {
          gross
          currency
        }
        items {
          images {
            url
          }
          variant {
            sku
            name
          }
        }
      }
    }
  `;

    const response = await fetch(
        "https://shop-api-production.crystallize-edge.workers.dev/@product-configurator/cart",
        {
            method: "POST",
            body: JSON.stringify({ query, variables: { input } }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    // TODO: return cart ID here
    const data = await response.json();
    return {};
}
