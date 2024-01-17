import type { Option } from "@/use-cases/contracts/product";
import { useCallback } from "react";
import type { Skus } from "../types";

type UseAccessoriesProps = {
    skus: Skus;
    onChange: ({ type, value }: { type: "options"; value?: string }) => void;
    options?: Option[];
};

export const useAccessories = ({
    skus,
    options,
    onChange,
}: UseAccessoriesProps) => {
    const isBagDisabled = skus.grip && skus.grip !== "natural-leather";

    const getIsSelected = useCallback(
        (sku: string) => skus.options?.includes(sku) ?? false,
        [skus.options]
    );

    const onOptionChange = useCallback(
        (selectedOption: Option) => {
            const optionSkus = [...(skus.options?.split(",") ?? [])];
            const isPresent = getIsSelected(selectedOption.sku);
            const rearRack = options?.find((opt) => opt.id === "rearRack");
            const leatherBag = options?.find((opt) => opt.id === "leatherBag");
            let nextOptionSkus: string[] = [];

            // Handle dependencies here
            if (!isPresent) {
                nextOptionSkus = [...optionSkus, selectedOption.sku];
                const shouldAddRearRack =
                    selectedOption.id === "leatherBag" &&
                    !!rearRack?.sku &&
                    !optionSkus.includes(rearRack.sku);

                shouldAddRearRack && nextOptionSkus.push(rearRack.sku);
            } else {
                nextOptionSkus = optionSkus.filter((sku) => {
                    return (
                        sku !== selectedOption.sku &&
                        !(
                            selectedOption.id === "rearRack" &&
                            sku === leatherBag?.sku
                        )
                    );
                });
            }

            onChange({ type: "options", value: nextOptionSkus.join(",") });
        },
        [skus.options, getIsSelected, options, onChange]
    );

    return { isBagDisabled, onOptionChange, getIsSelected };
};
