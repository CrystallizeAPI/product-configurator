import type { ApiGrid, UiGrid } from "@/use-cases/contracts/grid";
import type { ImageContent } from "./__generated__/types";

export const gridMapper = (grid: ApiGrid) => {
    const uiGrid: UiGrid = {
        id: grid.id,
        rows: grid.rows.map((row) => {
            return {
                columns: row.columns.map(({ layout, item }, index) => {
                    const image = (item?.component?.content as ImageContent).firstImage;

                    const columnItem = {
                        name: item?.name ?? "",
                        image: {
                            ...image,
                            showcase: image?.showcase?.map((showcase) => ({
                                hotspot: showcase.hotspot,
                                productVariant: showcase.productVariants?.[0],
                            })),
                        },
                    };

                    return {
                        index,
                        layout: {
                            colspan: layout?.colspan ?? 0,
                            rowspan: layout?.rowspan ?? 0,
                            colIndex: layout?.colIndex ?? 0,
                            rowIndex: layout?.rowIndex ?? 0,
                        },
                        item: columnItem,
                    };
                }),
            };
        }),
    };

    return { grid: uiGrid };
};
