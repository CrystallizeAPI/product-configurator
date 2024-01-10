import { Metadata } from "next";
import { Home } from "./home";
import { services } from "@/core/services";

export const metadata: Metadata = {
    title: "Product Configurator Boilerplate with Crystallize",
};

export default async function HomePage() {
    const { api } = await services();
    const { grid } = await api.getGrid("6595737433383f7ef75d6d68");

    return <Home grid={grid} />;
}
