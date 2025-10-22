import { crystallizeClient } from "@/core/crystallize-client.server";
import type { ApiGridProducts } from "@/use-cases/contracts/grid-products";
import { gridMapper } from "./grid-mapper";
import { config } from "../core/config";

const query = `#graphql
query GET_GRID_PRODUCTS($language: String!, $path: String!) {
  catalogue(language: $language, path: $path) {
    subtree(first: 5) {
      edges {
        node {
          id
          name
          component(id: "image") {
            content {
              ... on ImageContent {
                firstImage {
                  ...Image
                  showcase {
                    hotspot {
                      x
                      y
                    }
                    productVariants(language: $language) {
                      name
                      sku
                      product {
                        paths {
                          canonical
                        }
                      }
                      images {
                        ...Image
                      }
                      priceVariant(identifier: "default") {
                        price
                        currency
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment Image on Image {
  url
  width
  height
  altText
  variants {
    url
    width
    height
  }
}
`;

export async function getGridProducts(path: string) {
    const { catalogue } = await crystallizeClient.catalogueApi<{
        catalogue: ApiGridProducts;
    }>(query, { path, language: config.language });
    return gridMapper(catalogue);
}
