import Link from "next/link";
import { Image } from "@crystallize/reactjs-components";

import type { Column } from "@/use-cases/contracts/grid";
import { getLinkQueryParams } from "@/use-cases/get-link-query-params";
import { Showcase } from "./showcase";

type ImageProps = React.ComponentProps<typeof Image>;
type GridCellProps = {
    cell: Column;
};

export function GridCell({ cell }: GridCellProps) {
    const { item } = cell;
    const { showcase, ...image } = item.image;
    const productVariants = item.image.showcase?.map(
        (showcase) => showcase.productVariant
    );

    return (
        <Link href={`/product?${getLinkQueryParams(productVariants)}`}>
            <div className="group/wrapper w-full h-full relative rounded-xl border border-transparent hover:border-muted">
                <Image
                    {...(image as ImageProps)}
                    sizes={
                        cell.index === 0
                            ? "(max-width: 800px) 1200px, 1200px"
                            : "(max-width: 800px) 260px, 380px"
                    }
                    className="w-full h-full rounded-xl  overflow-hidden relative [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:rounded-md"
                    alt={cell.item.image.alt ?? undefined}
                />
                <div className="absolute left-0 text-center top-2 w-full flex justify-left pl-4 p-2 text-gray-700 bg-price-background">
                    <h3 className="text-gray-600 text-sm">{cell.item.name}</h3>
                </div>
                {showcase?.map((showcase, index) => (
                    <Showcase key={index} showcase={showcase} />
                ))}
            </div>
        </Link>
    );
}
