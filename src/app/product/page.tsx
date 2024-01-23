import Configurator from "./configurator";
import { getProduct } from "../../actions/get-product";

export default async function Page() {
    const { product } = await getProduct("/bicycles/speed-curve");

    return (
        <div className="flex min-h-[100vh] bg-white relative  items-center justify-between min-w-full ">
            <Configurator product={product} />
        </div>
    );
}
