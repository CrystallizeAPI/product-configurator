import type { ApiGridProducts } from "@/use-cases/contracts/grid-products";

export const gridMapper = (catalogue?: ApiGridProducts) => {
    return catalogue?.subtree?.edges?.flatMap((edge) => {
        const product = edge.node;
        return !!product
            ? {
                  id: product.id,
                  name: product.name,
                  image: product.component.content.firstImage,
              }
            : [];
    });
};
