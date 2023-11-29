import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Product Configurator Boilerplate with Crystallize',
}

export default function Home() {
  return  (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/product">Product Configurator</Link>
      </li>
    </ul>
  )
}
