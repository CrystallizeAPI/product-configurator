import Configurator from "./configurator";
import { getProduct } from "@/use-cases/get-product";

const mainProductPath =
    process.env.MAIN_PRODUCT_PATH || "/bicycles/speed-curve";

export default async function Page() {
    const { product } = await getProduct(mainProductPath);

    return (
        <div className="flex-1 bg-white relative overflow-auto px-12">
            <div className="py-12">
                <h2 className="text-3xl font-medium pb-3 text-gray-600">
                    {product.name}
                </h2>
                <p className="text-normal text-lg text-gray-500 mb-2">
                    A classic curved bicycle re-imageined and engineered in
                    modern materials. No plastic.
                </p>
            </div>

            <Configurator product={product} />
        </div>
    );
}
