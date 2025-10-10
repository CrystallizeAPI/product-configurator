import Configurator from "./configurator";
import { getProduct } from "@/use-cases/get-product";

const mainProductPath = process.env.MAIN_PRODUCT_PATH || "/bicycles/speed-curve";

export default async function Page() {
    const { product } = await getProduct(mainProductPath);

    return (
        <div className="flex min-h-[100vh] bg-white relative  items-center justify-between min-w-full ">
            <Configurator product={product} />
        </div>
    );
}
