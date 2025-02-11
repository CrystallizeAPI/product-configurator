import { Image } from "@crystallize/reactjs-components";

import type { Variant, Skus } from "@/use-cases/contracts/product";

type GripSelectorProps = {
    grips: Variant["grips"];
    skus: Skus;
    onChange: (sku: string) => void;
};

export const GripSelector = ({ grips, skus, onChange }: GripSelectorProps) => {
    return (
        <div className="flex flex-col gap-1">
            {grips?.map((grip) => (
                <div
                    role="button"
                    key={grip.sku}
                    onClick={() => onChange(grip.sku)}
                    className={`bg-white overflow-hidden border border-solid cursor-pointer hover:bg-gray-50 rounded flex items-center ${
                        skus.grip === grip.sku
                            ? "border-gray-400"
                            : "border-muted"
                    }`}
                >
                    <div className="w-28 flex justify-center">
                        <Image
                            className="w-16"
                            src={grip.image?.url}
                            alt={grip.name}
                            width={128}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px] text-gray-800">
                            {grip.modelAttribute}
                        </div>
                        <div className="text-[12px] text-gray-500">
                            {grip.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
