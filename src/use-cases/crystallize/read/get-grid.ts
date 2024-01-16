"use server";

import type { ClientInterface } from "@crystallize/js-api-client";
import { gridMapper } from "../mapper/grid-mapper";

export async function getGrid(apiClient: ClientInterface, id: string) {
    const query = `#graphql
    query GET_GRID($id: ID!, $language: String!) {
      grid(id: $id, language: $language) {
        id
        rows {
          columns {
            layout {
              colspan
              rowspan
              colIndex
              rowIndex
            }
            item {
              name
              component(id: "image") {
                content {
                  ...on ImageContent {
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

    const options = { id, language: "en" };

    const { grid } = await apiClient.catalogueApi(query, options);
    return gridMapper(grid);
}
