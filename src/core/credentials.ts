"use sever";

export const credentials = {
    tenantIdentifier: `${process.env.CRYSTALLIZE_TENANT_IDENTIFIER}`,
    tenantId: `${process.env.CRYSTALLIZE_TENANT_ID}`,
    accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
    accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
} as const;

export const cookieName = "shop_api";
