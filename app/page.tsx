import { Metadata } from "next";
import { Home } from "./home";
import { getGridProducts } from "@/use-cases/get-grid-products";

export const metadata: Metadata = {
    title: "Product Configurator Boilerplate with Crystallize",
};

export default async function HomePage() {
    const products = await getGridProducts("/tiles");

    return <Home products={products} />;
}
