import type { UiProductVariant } from '@/use-cases/contracts/grid';

export const getLinkQueryParams = (productVariants?: Array<UiProductVariant | undefined>) => {
    const queryParams = new URLSearchParams();
    const options: string[] = [];

    productVariants?.forEach((variant) => {
        let key = '';
        const sku = variant?.sku;
        const path = variant?.product?.paths?.canonical;

        if (!sku || !path) {
            return;
        }

        if (path.includes('/bicycles/')) {
            key = 'v';
        } else if (path.includes('/saddles/')) {
            key = 'saddle';
        } else if (path.includes('/grips/')) {
            key = 'grip';
        } else if (path.includes('/accessories/')) {
            options.push(sku);
        }

        !!key && queryParams.set(key, sku);
    });

    !!options.length && queryParams.set('options', options.join(','));

    return queryParams.toString();
};
