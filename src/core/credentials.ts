"use sever";

export const credentials = {
    tenantIdentifier: "product-configurator",
    tenantId: "6566eee5c53426877c8ad16a",
    accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
    accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
} as const;

export const cookieName = "shop_api";
