'use server';

import { apiClient } from '@/core';

export type ShopApiClient = {
    shopApi: (query: string, variables: Record<string, any>) => Promise<void>;
};

export async function shopApiClient(query: string, variables: Record<string, any>) {
    return (await apiClient()).shopCartApi(query, variables);
}
