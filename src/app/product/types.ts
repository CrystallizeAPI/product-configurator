export type Skus = {
    v: string;
    grip?: string;
    saddle?: string;
    options?: string;
};

export type ModelViewerNode = HTMLElement & {
    setFrameColor: (attribute?: string) => void;
    setSaddleColor: (attribute?: string) => void;
    toggleLuggageRackBack: (isVisible: boolean) => void;
    toggleLuggageRackFront: (isVisible: boolean) => void;
    toggleLeatherBag: (isVisible: boolean) => void;
    dismissPoster: () => void;
};

export type CartItem = {
    imageUrl: string;
    name: string;
    price?: {
        value?: number;
        currency?: string;
    };
    childrenItems: {
        name: string;
        imageUrl: string;
        sku: string;
        price: {
            value?: number;
            currency?: string;
        };
    }[];
};

declare global {
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
