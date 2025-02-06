'use client';

import { useState } from 'react';
import { Image } from '@crystallize/reactjs-components';
import type { Showcase } from '@/use-cases/contracts/grid';
import { priceFormatter } from '@/utils/format-price';

type ShowcaseProps = {
    showcase: Showcase;
};

export function Showcase({ showcase }: ShowcaseProps) {
    const [isActive, setIsActive] = useState(false);
    const image = showcase.productVariant?.images?.[0];
    const price = showcase.productVariant?.priceVariant?.price;
    const currency = showcase.productVariant?.priceVariant?.currency ?? '';

    return (
        <div
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={(e) => e.preventDefault()}
            className="cursor-default group group-hover/wrapper:scale-100 scale-0 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center absolute w-6 h-6 rounded-full bg-[#0006] hover:border-[3px] border-0 border-solid border-[#fff6]"
            style={{
                left: `${(showcase.hotspot?.x ?? 0) * 100}%`,
                top: `${(showcase.hotspot?.y ?? 0) * 100}%`,
                ...(isActive && { zIndex: 1 }),
            }}
        >
            <span className="w-2.5 h-2.5 bg-white rounded-full transition-all group-hover:w-2 group-hover:h-2 group-hover:z-50" />

            <div className="pointer-events-none absolute rounded-md bg-white mb-2 bottom-full duration-200 left-2.5 -translate-x-1/2 p-1 transition scale-0 group-hover:scale-100 origin-bottom">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 duration-150">
                    <div className="w-8 h-10">
                        <Image
                            {...image}
                            sizes="40px"
                            className="w-full h-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded"
                            altText={image?.altText ?? undefined}
                        />
                    </div>
                    <div className="font-medium text-gray-600 text-sm">
                        <h3 className="whitespace-nowrap pr-2">{showcase.productVariant?.name}</h3>
                        <p>{priceFormatter({ value: price ?? 0, currency })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
