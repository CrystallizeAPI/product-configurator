"use client";

import { GridRenderer, GridRenderingType } from "@crystallize/reactjs-components";
import type { UiGrid } from "@/use-cases/contracts/grid";

import { Cell } from "./components/cell";

type HomeProps = {
    grid: UiGrid;
};

export function Home({ grid }: HomeProps) {
    return (
        <div className="my-10 px-12 m-auto [&_div]:gap-3">
            <GridRenderer grid={grid} cellComponent={Cell} type={GridRenderingType.CSSGrid} />
        </div>
    );
}
