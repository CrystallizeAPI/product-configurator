import { crystallizeClient } from "@/core/crystallize-client.server";
import type { ApiProduct } from "@/use-cases/contracts/product";
import { productMapper } from "./product-mapper";
import { language } from "./variables";

const query = `#graphql
  query($path: String!) {
    product: catalogue(path: $path, language: "en") {
    id
    name
      components {
        id
        content {
          ...on ItemRelationsContent {
            ...itemRelation
          }
        }
      }
    ... on Product {
      variants {
        name
        sku
        attributes {
          attribute
          value
        }
        firstImage {
          url
        }
        defaultPrice: priceVariant(identifier:"default"){
          currency
          price
        }
        components {
          id
          content {
            ... on SingleLineContent {
              text
            }
            ... on NumericContent {
              unit
              number
            }
            ... on ItemRelationsContent {
              ...itemRelation
            }
          }
        }
      }
    }
  }
  }
  
  fragment itemRelation on ItemRelationsContent {
    items {
      name
      ... on Product {
        defaultVariant {
          sku
          name
          firstImage {
            url
          }
          defaultPrice: priceVariant(identifier:"default"){
            currency
            price
          }
          components {
            ...content
          }
        }
      }
      components {
        ...content
      }
    }
      productVariants {
        name
        defaultPrice: priceVariant(identifier:"default"){
          currency
          price
        }
        sku
        components {
          id
        }
        firstImage {
          url
        }
        components {
          ...content
        }
      }
  }

  fragment content on Component  {
      id
      content {
          ...on SingleLineContent {
            text
          }
          ...on ContentChunkContent {
            chunks {
              id
              content {
                ...on SingleLineContent {
                  text
                }
              }
            }
          }
            
      }
  }
  `;

export async function getProduct(path: string) {
    const { product } = await crystallizeClient.catalogueApi<{ product: ApiProduct }>(query, { path, language });
    return productMapper(product);
}
