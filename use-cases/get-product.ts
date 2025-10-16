import { crystallizeClient } from "@/core/crystallize-client.server";
import type { ApiProduct } from "@/use-cases/contracts/product";
import { productMapper } from "./product-mapper";
import { config } from "../core/config";

const query = `#graphql
  query($path: String!, $language: String!) {
    product: catalogue(path: $path, language: $language) {
    id
    name
    components {
      id
      content {
        ...on ItemRelationsContent {
          ...itemRelation
        }
        ... on ContentChunkContent {
          chunks {
            content {
              ... on FileContent {
                firstFile {
                  url
                }
              }
            }
          }
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
    const { product } = await crystallizeClient.catalogueApi<{
        product: ApiProduct;
    }>(query, { path, language: config.language });
    return productMapper(product);
}
