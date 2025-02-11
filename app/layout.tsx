import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { Header } from "@/components/header";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Product configurator ",
    description: "Product configurator boilerplate powered by Crystallize",
};

type LayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <head>
                <script
                    async
                    type="module"
                    src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/mvc.js"
                />
            </head>
            <body
                className={`${manrope.className} flex flex-col bg-white h-screen overflow-hidden`}
            >
                <CartProvider>
                    <Header />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
