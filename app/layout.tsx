import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/header";
import { Cart } from "@/components/cart";
import "./globals.css";

const roboto = Roboto({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Product Configurator ",
    description: "Product Configurator Boilerplate powered by Crystallize",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} bg-white flex h-screen flex-col`}
            >
                <CartProvider>
                    <Header />
                    {children}
                    <Cart />
                </CartProvider>
            </body>
        </html>
    );
}
