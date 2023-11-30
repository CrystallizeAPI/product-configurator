import Configurator from "./configurator";
import { fetchProduct } from "./query";
export default async function Page() {
  const { product } = await fetchProduct("/bicycles/speed-curve");
  return (
    <div className="flex min-h-[100vh] bg-[#FAfdf3] relative  items-center justify-between min-w-full ">
      <Configurator product={product} />
    </div>
  );
}
