"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUrlState } from "./use-url-state";
import type { Skus, ModelViewerNode } from "../types";
import type { UiProduct } from "@/use-cases/contracts/product";

type OnChange =
    | { type: "frame"; value: string }
    | { type: "saddle"; value: string }
    | { type: "grip"; value: string }
    | { type: "options"; value?: string };

const getBagProps = (gripSku?: string) => {
    return gripSku && gripSku !== "natural-leather"
        ? { sku: { leatherBag: undefined }, isHidden: true }
        : {};
};

const toggleOption = (
    node: ModelViewerNode | null,
    id: string,
    isVisible: boolean
) => {
    const optionKey = id as keyof typeof optionMap;
    const optionMap = {
        frontRack: () => node?.toggleLuggageRackFront(isVisible),
        rearRack: () => node?.toggleLuggageRackBack(isVisible),
        leatherBag: () => node?.toggleLeatherBag(isVisible),
    };

    optionMap[optionKey]?.();
};

export const useConfigurator = (product: UiProduct) => {
    const { variants, options } = product;
    const modelViewer = useRef<ModelViewerNode | null>(null);
    const [skus, setSkus] = useUrlState<Skus>();
    const currentVariant = variants?.find((variant) => variant.sku === skus.v);
    const retryCountRef = useRef(0);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    const getViewer = useCallback(
        (node: ModelViewerNode) => {
            const setView = (node: ModelViewerNode) => {
                if (isModelLoaded || !node) {
                    return;
                }

                try {
                    const { frameColor, saddles } = currentVariant ?? {};
                    const saddle = saddles?.find(
                        (saddle) => saddle.sku === skus.saddle
                    );

                    node.setFrameColor(frameColor?.modelAttribute);
                    setTimeout(() => {
                        node?.setSaddleColor(saddle?.modelAttribute);
                    }, 100);

                    const optionSkus = skus.options?.split(",") ?? [];
                    options?.forEach((opt) => {
                        const isVisible = optionSkus.includes(opt.sku);
                        toggleOption(node, opt.id, isVisible);
                    });

                    modelViewer.current = node;
                    // give some time the remove bag animation to complete
                    setTimeout(() => setIsModelLoaded(true), 400);
                } catch {
                    // the model may throw is it is not loaded when trying to access it to set it up
                    retryCountRef.current = retryCountRef.current + 1;
                    retryCountRef.current < 50 &&
                        setTimeout(() => setView(node), 200);
                }
            };

            setView(node);
        },
        [currentVariant, skus, isModelLoaded, options]
    );

    // auto select the first variant when the param is not present in the URL
    useEffect(() => {
        const variant = variants?.[0];

        if (!skus.v && !!variant) {
            const { sku, saddles, grips } = variant;

            setSkus({
                v: sku,
                saddle: saddles?.[0].sku,
                grip: grips?.[0].sku,
            });
        }
    }, [setSkus, skus.v, variants, options]);

    const onChange = useCallback(
        ({ type, value }: OnChange) => {
            const node = modelViewer.current;
            console.log(type, value);
            switch (type) {
                case "frame": {
                    const nextVariant = variants?.find(
                        (variant) => variant.sku === value
                    );
                    const { frameColor, saddles, grips } = nextVariant ?? {};
                    const saddle = saddles?.[0].sku;
                    const grip = grips?.[0].sku;
                    const bagProps = getBagProps(grip);

                    setSkus({
                        ...skus,
                        v: value,
                        saddle,
                        grip,
                        ...bagProps.sku,
                    });
                    bagProps.isHidden && node?.toggleLeatherBag(false);
                    node?.setFrameColor(frameColor?.modelAttribute);
                    setTimeout(() => {
                        node?.setSaddleColor(saddles?.[0]?.modelAttribute);
                    }, 100);

                    break;
                }
                case "saddle": {
                    const saddle = currentVariant?.saddles?.find(
                        (variantSaddle) => variantSaddle.sku === value
                    );
                    const grip = currentVariant?.grips?.find(
                        (variantGrip) =>
                            variantGrip.modelAttribute ===
                            saddle?.modelAttribute
                    );
                    const bagProps = getBagProps(grip?.sku);

                    setSkus({
                        ...skus,
                        saddle: value,
                        grip: grip?.sku,
                        ...bagProps.sku,
                    });
                    node?.setSaddleColor(saddle?.modelAttribute);
                    bagProps.isHidden && node?.toggleLeatherBag(false);
                    break;
                }
                case "grip": {
                    const grip = currentVariant?.grips?.find(
                        (variantGrip) => variantGrip.sku === value
                    );
                    const saddle = currentVariant?.saddles?.find(
                        (variantSaddle) =>
                            variantSaddle.modelAttribute ===
                            grip?.modelAttribute
                    );
                    const bagProps = getBagProps(grip?.sku);

                    setSkus({
                        ...skus,
                        grip: value,
                        saddle: saddle?.sku,
                        ...bagProps.sku,
                    });
                    node?.setSaddleColor(grip?.modelAttribute);
                    bagProps.isHidden && node?.toggleLeatherBag(false);
                    break;
                }
                case "options": {
                    options?.forEach((opt) => {
                        const isVisible = value?.includes(opt.sku) ?? false;
                        console.log(opt.id, isVisible);
                        toggleOption(node, opt.id, isVisible);
                    });
                    setSkus({
                        ...skus,
                        options: !value ? undefined : value,
                    });
                    break;
                }
            }
        },
        [setSkus, variants, currentVariant, skus, options]
    );

    return {
        skus,
        setSkus,
        currentVariant,
        getViewer,
        isModelLoaded,
        onChange,
        modelViewer: modelViewer.current,
    };
};
