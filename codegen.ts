import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [
        {
            [`https://api.crystallize.com/product-configurator/catalogue`]: {},
        },
    ],
    generates: {
        "./use-cases/__generated__/types.ts": {
            plugins: ["typescript"],
            config: {
                preResolveTypes: false,
            },
        },
    },
};

export default config;
