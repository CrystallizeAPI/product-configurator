import { forwardRef } from "react";
import type { ModelViewerNode } from "../types";

export const ModelViewer = forwardRef<ModelViewerNode>((_, ref) => {
    return (
        <model-viewer
            id="viewer"
            ref={ref}
            src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/SpeedCurve.glb"
            camera-orbit="-135deg 0 0"
            // camera-target="-0.4m 0.5m 0"
            camera-controls
            shadow-intensity="4"
            shadow-softness="1"
            exposure="1.3"
            environment-image="https://cdn2.charpstar.net/HDR/HDRI-Default.hdr"
        />
    );
});
