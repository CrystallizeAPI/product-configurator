import { Suspense } from "react";

import { Configurator } from "@/components/configurator";
import { getProduct } from "../actions/get-product";

export default async function Page() {
    const { product } = await getProduct("/bicycles/speed-curve");

    return (
        <main className="flex flex-1 overflow-hidden">
            <Suspense fallback={null}>
                <Configurator product={product} />
            </Suspense>
        </main>
    );
}
