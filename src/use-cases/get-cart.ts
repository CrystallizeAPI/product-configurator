import { crystallizeClient } from "@/core/crystallize-client.server";
import { CartItem } from "@/app/product/types";
import { priceFormatter } from "@/utils/format-price";

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

export async function getCart(id: string) {
    const data = await crystallizeClient.shopCartApi<Data>(query, { id });
    const { items, total } = data.cart;

    const [firstItem, ...childrenItems] = items;
    const cartItem: CartItem = {
        name: firstItem.name,
        imageUrl: firstItem.images[0].url,
        sku: firstItem.variant.sku,
        price: firstItem.price,
        childrenItems: childrenItems.map((item) => ({
            name: item.name,
            imageUrl: item.images[0].url,
            sku: item.variant.sku,
            price: item.price,
        })),
    };

    return {
        cartItem,
        price: priceFormatter({ value: total.gross, currency: total.currency }),
    };
}
