"use server";

import { createClient } from "@crystallize/js-api-client";
import { getApi } from "@/use-cases/crystallize";

export const services = () => {
    const apiClient = createClient({
        tenantIdentifier: "product-configurator",
        tenantId: "6566eee5c53426877c8ad16a",
        accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
        accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
    });

    return {
        api: getApi(apiClient),
    };
};
