"use server";

import { cookies } from "next/headers";
import { cookieName } from "@/core/credentials";
import { credentials } from "./credentials";

export type ShopApiClient = {
    shopApi: (query: string, variables: Record<string, any>) => Promise<void>;
};

export async function shopApiClient(
    query: string,
    variables: Record<string, any>
) {
    const url = `https://shop-api.crystallize.com/@${credentials.tenantIdentifier}/cart`;

    const cookieStore = cookies();
    const shopApiToken = cookieStore.get(cookieName);

    if (!shopApiToken) {
        throw Error();
    }

    const shopResponse = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${shopApiToken.value}`,
        },
        body: JSON.stringify({ query, variables }),
    });

    return await shopResponse.json();
}
