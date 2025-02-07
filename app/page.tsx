import { getGrid } from './actions/get-grid';
import { GridRenderer, GridRenderingType } from '@crystallize/reactjs-components';
import { GridCell } from '@/components/grid-cell';

export const revalidate = 120;

export default async function HomePage() {
    const { grid } = await getGrid('6595737433383f7ef75d6d68');

    return (
        <div className="my-10 px-12 m-auto [&_div]:gap-3">
            <GridRenderer grid={grid} cellComponent={GridCell} type={GridRenderingType.CSSGrid} />
        </div>
    );
}
