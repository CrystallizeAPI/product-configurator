'use server';

import { apiClient } from '@/core';
import { getGrid as getGridQuery } from '@/use-cases/crystallize';

export async function getGrid(id: string) {
    const client = await apiClient();
    return getGridQuery(client, id);
}
