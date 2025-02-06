'use server';

import { createClient } from '@crystallize/js-api-client';
import { credentials } from './credentials';

export async function apiClient() {
    return createClient(credentials);
}
