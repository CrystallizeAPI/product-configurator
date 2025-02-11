export type ModelViewerNode = HTMLElement & {
    setFrameColor: (attribute?: string) => void;
    setSaddleColor: (attribute?: string) => void;
    toggleLuggageRackBack: (isVisible: boolean) => void;
    toggleLuggageRackFront: (isVisible: boolean) => void;
    toggleLeatherBag: (isVisible: boolean) => void;
    dismissPoster: () => void;
};

declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src: string;
                    exposure: string;
                },
                HTMLElement
            >;
        }
    }
}
