import { Metadata } from "next";
import { Home } from "./home";
import { getGrid } from "../actions/get-grid";

export const metadata: Metadata = {
    title: "Product Configurator Boilerplate with Crystallize",
};

export default async function HomePage() {
    const { grid } = await getGrid("6595737433383f7ef75d6d68");

    return <Home grid={grid} />;
}
