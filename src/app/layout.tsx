import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product Configurator ',
  description: 'Product Configurator Boilerplate powerd by Crystallize',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async 
          type="module"
        src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/mvc.js" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
