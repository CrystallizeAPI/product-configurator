"use server";

import { createClient } from "@crystallize/js-api-client";

const apiClient = createClient({
  tenantIdentifier: "product-configurator",
});

export async function fetchProduct(path) {
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
        }
      }
      components {
        id
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

  const options = {
    path,
    language: "en",
  };

  const response = await apiClient.catalogueApi(query, options);
  return response;
}
