import Configurator from "./configurator";
import { services } from "@/core/services";

export default async function Page() {
    const { api } = await services();
    const { product } = await api.getProduct("/bicycles/speed-curve");

    return (
        <div className="flex min-h-[100vh] bg-[#FAfdf3] relative  items-center justify-between min-w-full ">
            <Configurator product={product} />
        </div>
    );
}
