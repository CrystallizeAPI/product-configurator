"use client";

import { useRef, useEffect, useCallback } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import "@google/model-viewer/lib/model-viewer";

import type { Skus, UiProduct, Variant } from "@/use-cases/contracts/product";

type ModelViewerProps = {
    skus: Skus;
    product: UiProduct;
    currentVariant: Variant;
};

const ModelViewer = ({ skus, product, currentVariant }: ModelViewerProps) => {
    const modelViewerRef = useRef<ModelViewerElement>(null);

    const updateModel = useCallback(
        async (onComplete?: () => void) => {
            const modelViewer = modelViewerRef.current;
            if (!modelViewer) {
                return;
            }

            const frame = currentVariant.frameColor?.modelAttribute;
            modelViewer.variantName = `Frame--${frame}`;

            const optionSkus = skus.options?.split(",") ?? [];

            product.options?.forEach((opt) => {
                opt.model.forEach(({ modelAttribute }) => {
                    const material =
                        modelViewer?.model?.getMaterialByName(modelAttribute);
                    const metallicRoughness = material?.pbrMetallicRoughness;

                    if (optionSkus.includes(opt.sku)) {
                        metallicRoughness?.setBaseColorFactor([1, 1, 1, 1]);
                    } else {
                        material?.setAlphaMode("MASK");
                        metallicRoughness?.setBaseColorFactor([1, 1, 1, 0]);
                    }
                });
            });

            setTimeout(() => {
                const saddle = currentVariant.saddles?.find(
                    (saddle) => saddle.sku === skus.saddle
                )?.modelAttribute;
                modelViewer.variantName = `Saddle--${saddle}`;
                onComplete?.();
            }, 0);
        },
        [skus]
    );

    useEffect(() => {
        const modelViewer = modelViewerRef.current;
        modelViewer?.addEventListener("load", () =>
            updateModel(() => modelViewer.dismissPoster())
        );
    }, []);

    useEffect(() => {
        updateModel();
    }, [JSON.stringify(skus)]);

    return (
        <model-viewer
            src={product.glb}
            ref={modelViewerRef}
            camera-orbit="-135deg 0 0"
            camera-controls
            shadow-intensity="4"
            shadow-softness="1"
            exposure="1.3"
            loading="eager"
            reveal="manual"
            poster={currentVariant.imageUrl}
            className="w-full h-full"
        />
    );
};

export default ModelViewer;
