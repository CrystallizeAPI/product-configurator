import { crystallizeClient } from "@/core/crystallize-client.server";
import type { ApiGrid } from "@/use-cases/contracts/grid";
import { gridMapper } from "./grid-mapper";
import { config } from "../core/config";

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

export async function getGrid(id: string) {
    const { grid } = await crystallizeClient.catalogueApi<{ grid: ApiGrid }>(query, { id, language: config.language });
    return gridMapper(grid);
}
