"use client";

import {
    GridRenderer,
    GridRenderingType,
} from "@crystallize/reactjs-components";
import { Cell } from "./components/cell";

type HomeProps = {
    grid: any;
};

export function Home({ grid }: HomeProps) {
    console.log(grid);
    return (
        <div className="my-10 max-w-6xl m-auto [&_div]:gap-4">
            <GridRenderer
                grid={grid}
                cellComponent={Cell}
                type={GridRenderingType.CSSGrid}
            />
        </div>
    );
}
