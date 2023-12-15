"use server";

import { createClient } from "@crystallize/js-api-client";
import { getApi } from "@/use-cases/crystallize";

export const services = () => {
    const apiClient = createClient({
        tenantIdentifier: "product-configurator",
    });

    return {
        api: getApi(apiClient),
    };
};
