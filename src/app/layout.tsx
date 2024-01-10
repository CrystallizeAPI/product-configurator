import type { Metadata } from "next";
import { Roboto } from "next/font/google";
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
            <head>
                <script
                    async
                    type="module"
                    src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/mvc.js"
                />
            </head>
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
