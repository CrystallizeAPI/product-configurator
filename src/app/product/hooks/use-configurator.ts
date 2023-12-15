"use client";

import { useCallback, useEffect, useRef } from "react";
import { useUrlState } from "../utils/use-url-state";
import type { Skus, ModelViewerNode } from "../types";
import type { UiProduct, OptionsSkus } from "@/use-cases/contracts/product";

export const useConfigurator = (product: UiProduct) => {
    const { name, variants, options } = product;
    const modelViewer = useRef<ModelViewerNode | null>(null);
    const [skus, setSkus] = useUrlState<Skus>();
    const currentVariant = variants?.find((variant) => variant.sku === skus.v);
    const retryCountRef = useRef(0);

    const getViewer = useCallback(
        (node: ModelViewerNode) => {
            const setView = () => {
                try {
                    const { frameColor, saddles } = currentVariant ?? {};
                    const saddle = saddles?.find(
                        (saddle) => saddle.sku === skus.saddle
                    );

                    node?.setFrameColor(frameColor?.modelAttribute);
                    node?.setSaddleColor(saddle?.modelAttribute);
                    node?.toggleLuggageRackBack(!!skus.rearRack);
                    node?.toggleLuggageRackFront(!!skus.frontRack);
                    node?.toggleLeatherBag(!!skus.leatherBag);
                    node?.dismissPoster();

                    modelViewer.current = node;
                } catch {
                    // the model may throw is it is not loaded when trying to access it to set it up
                    retryCountRef.current = retryCountRef.current + 1;
                    retryCountRef.current < 50 &&
                        setTimeout(() => setView(), 200);
                }
            };

            setView();
        },
        [currentVariant, skus]
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
                ...options?.reduce((acc, opt) => {
                    acc[opt.id] = opt.sku;
                    return acc;
                }, {} as Record<keyof OptionsSkus, string>),
            });
        }
    }, [setSkus, skus.v, variants, options]);

    return { skus, setSkus, currentVariant, getViewer };
};
