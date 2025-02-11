import {
    GridRenderer,
    GridRenderingType,
} from "@crystallize/reactjs-components";
import { GridCell } from "@/components/grid-cell";

import { getGrid } from "./actions/get-grid";

export const revalidate = 120;

export default async function HomePage() {
    const { grid } = await getGrid("6595737433383f7ef75d6d68");

    return (
        <main className="p-10 [&_div]:gap-3 [&_div]:min-w-0 [&_div]:min-h-0 overflow-hidden flex-1">
            <GridRenderer
                grid={grid}
                cellComponent={GridCell}
                type={GridRenderingType.CSSGrid}
                // @ts-expect-error className exists on the GridRenderer
                className="w-full h-full"
            />
        </main>
    );
}
