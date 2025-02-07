import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/header';
import { Cart } from '@/components/cart';

import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Product configurator ',
    description: 'Product configurator boilerplate powered by Crystallize',
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
            <body className={`${manrope.className} bg-white`}>
                <CartProvider>
                    <Header />
                    {children}
                    <Cart />
                </CartProvider>
            </body>
        </html>
    );
}
