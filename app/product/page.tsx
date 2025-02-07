import Configurator from './configurator';
import { getProduct } from '../actions/get-product';
import { Suspense } from 'react';

export default async function Page() {
    const { product } = await getProduct('/bicycles/speed-curve');

    return (
        <div className="flex min-h-[100vh] bg-white relative  items-center justify-between min-w-full ">
            <div className="w-full py-12">
                <div className="px-12">
                    <h2 className="text-3xl font-medium pb-3 text-gray-600">{product.name}</h2>
                    <p className="text-normal text-lg text-gray-500 mb-2">
                        A classic curved bicycle re-imageined and engineered in modern materials. No plastic.
                    </p>
                </div>
                <Suspense fallback={null}>
                    <Configurator product={product} />
                </Suspense>
            </div>
        </div>
    );
}
