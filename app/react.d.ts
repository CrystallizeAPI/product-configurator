/// <reference types="@google/model-viewer" />

export declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<
                React.AllHTMLAttributes<
                    Partial<globalThis.HTMLElementTagNameMap["model-viewer"]>
                >,
                Partial<globalThis.HTMLElementTagNameMap["model-viewer"]>
            > & {
                "camera-orbit"?: string;
                "camera-controls"?: boolean;
                "shadow-intensity"?: string;
                "shadow-softness"?: string;
                exposure?: string;
                loading?: "auto" | "lazy" | "eager";
                reveal?: "auto" | "manual";
                ar?: boolean;
            };
        }
    }
}
