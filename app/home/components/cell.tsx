import { useState } from "react";
import Link from "next/link";
import { Image } from "@crystallize/reactjs-components";

import type {
    GridProduct,
    UiProductVariant,
} from "@/use-cases/contracts/grid-products";
import { formatPrice } from "@/utils/format-price";

type ImageProps = React.ComponentProps<typeof Image>;
type CellProps = {
    product: GridProduct;
    index: number;
};

const getQueryParams = (
    productVariants?: Array<UiProductVariant | undefined>
) => {
    const queryParams = new URLSearchParams();
    const options: string[] = [];

    productVariants?.forEach((variant) => {
        let key = "";
        const sku = variant?.sku;
        const path = variant?.product?.paths?.canonical;

        if (!sku || !path) {
            return;
        }

        if (path.includes("/bicycles/")) {
            key = "v";
        } else if (path.includes("/saddles/")) {
            key = "saddle";
        } else if (path.includes("/grips/")) {
            key = "grip";
        } else if (path.includes("/accessories/")) {
            options.push(sku);
        }

        !!key && queryParams.set(key, sku);
    });

    !!options.length && queryParams.set("options", options.join(","));

    return queryParams.toString();
};

export function Cell({ product, index }: CellProps) {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        undefined
    );
    const productVariants = product.image.showcase?.map(
        (showcase) => showcase.productVariants?.[0]
    );

    return (
        <Link href={`/product?${getQueryParams(productVariants)}`}>
            <div className="group/wrapper w-full h-full relative rounded-xl border border-transparent hover:border-gray-200">
                <Image
                    {...(product.image as ImageProps)}
                    sizes={
                        index === 0
                            ? "(max-width: 800px) 1200px, 1200px"
                            : "(max-width: 800px) 260px, 380px"
                    }
                    className="w-full h-full rounded-xl  overflow-hidden relative [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:rounded-md"
                    alt={product.image.alt ?? undefined}
                />
                <div className="absolute left-0 text-center top-2 w-full flex justify-left pl-4 p-2 text-gray-700 bg-price-background">
                    <h3 className="text-gray-600 text-sm">{product.name}</h3>
                </div>
                {product.image.showcase?.map((showcase, index) => {
                    const variant = showcase.productVariants?.[0];
                    const image = variant?.images?.[0];
                    const price = variant?.priceVariant?.price;
                    const currency = variant?.priceVariant?.currency ?? "";

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(undefined)}
                            onClick={(e) => e.preventDefault()}
                            className="cursor-default group group-hover/wrapper:scale-100 scale-0 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center absolute w-6 h-6 rounded-full bg-[#0006] hover:border-[3px] border-0 border-solid border-[#fff6]"
                            style={{
                                left: `${(showcase.hotspot?.x ?? 0) * 100}%`,
                                top: `${(showcase.hotspot?.y ?? 0) * 100}%`,
                                ...(activeIndex === index && { zIndex: 1 }),
                            }}
                        >
                            <span className="w-2.5 h-2.5 bg-white rounded-full transition-all group-hover:w-2 group-hover:h-2" />

                            <div className="pointer-events-none absolute rounded-md bg-white mb-2 bottom-full duration-200 left-2.5 -translate-x-1/2 p-1 transition scale-0 group-hover:scale-100 origin-bottom">
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 duration-150">
                                    <div className="w-8 h-10">
                                        <Image
                                            {...(image as ImageProps)}
                                            sizes="40px"
                                            className="w-full h-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded"
                                            alt={image?.altText ?? undefined}
                                        />
                                    </div>
                                    <div className="font-medium text-gray-600 text-sm">
                                        <h3 className="whitespace-nowrap pr-2">
                                            {variant?.name}
                                        </h3>
                                        <p>
                                            {formatPrice({
                                                value: price ?? 0,
                                                currency,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Link>
    );
}
