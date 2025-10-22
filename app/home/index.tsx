"use client";

import type { GridProduct } from "@/use-cases/contracts/grid-products";

import { Cell } from "./components/cell";

type HomeProps = {
    products?: GridProduct[];
};

export function Home({ products }: HomeProps) {
    return (
        <div className="my-10 px-12 m-auto [&_div]:gap-3">
            <ul className="list-none p-0 m-0 grid grid-cols-[repeat(4,1fr)] gap-3">
                {products?.map((product, index) => {
                    return (
                        <li
                            key={product.id}
                            className={
                                index === 0
                                    ? "col-span-2 row-span-2"
                                    : "col-span-1 row-span-1"
                            }
                        >
                            <Cell product={product} index={index} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
