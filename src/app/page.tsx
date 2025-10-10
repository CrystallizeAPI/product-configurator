import { Metadata } from "next";
import { Home } from "./home";
import { getGrid } from "@/use-cases/get-grid";

export const metadata: Metadata = {
    title: "Product Configurator Boilerplate with Crystallize",
};

const productsGridId = process.env.PRODUCTS_GRID_ID || "6595737433383f7ef75d6d68";

export default async function HomePage() {
    const { grid } = await getGrid(productsGridId);

    return <Home grid={grid} />;
}
