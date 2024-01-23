"use server";

import { apiClient } from "@/core";
import { getProduct as getProductQuery } from "@/use-cases/crystallize";

export async function getProduct(id: string) {
    const client = await apiClient();
    return getProductQuery(client, id);
}
