"use client";

import VariantSelector from "./components/variant-selector";
import Image from "next/image";
import type { ModelViewerNode } from "./types";
import type { UiProduct } from "@/use-cases/contracts/product";
import { useConfigurator } from "./hooks/use-configurator";

const priceFormatter = (price?: { value?: number; currency?: string }) => {
    return !!price && price.value
        ? price.value.toLocaleString("en-US", {
              style: "currency",
              currency: price.currency,
          })
        : "";
};

type ConfiguratorProps = {
    product: UiProduct;
};

export default function Configurator({ product }: ConfiguratorProps) {
    const { name, variants, options } = product;
    const { skus, getViewer, currentVariant, isModelLoaded, onChange } =
        useConfigurator(product);

    return (
        <div className="flex min-h-screen bg-[#F7F6F9] relative  items-center justify-between min-w-full ">
            <div className="h-screen w-full relative">
                {!!currentVariant && (
                    <>
                        <model-viewer
                            id="viewer"
                            ref={getViewer}
                            src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/SpeedCurve.glb"
                            camera-orbit="-135deg 0 0"
                            // camera-target="-0.4m 0.5m 0"
                            camera-controls
                            shadow-intensity="4"
                            shadow-softness="1"
                            exposure="1.3"
                            environment-image="https://cdn2.charpstar.net/HDR/HDRI-Default.hdr"
                        />
                        <div
                            className={`absolute top-0 left-0 w-full h-full bg-white transition pointer-events-none ${
                                isModelLoaded ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            <Image
                                width="1000"
                                height="1000"
                                src={currentVariant.imageUrl}
                                alt="Bicycle image"
                                className="w-full h-full object-contain"
                                loading="eager"
                            />
                        </div>
                    </>
                )}
                <div className="from-[#F7F6F9] to-transparent absolute bg-gradient-to-l h-screen w-52 top-0 right-0 z-1 pointer-events-none" />
            </div>
            <div className="px-12 h-screen py-12 overflow-auto">
                <h2 className="text-2xl font-medium text-gray-600">{name}</h2>
                <p className="font-medium text-gray-600">
                    A classic curved bicycle re-imageined and engineered in
                    modern materials. No plastic.
                </p>
                <div className="text-xl py-4 font-medium">
                    {priceFormatter(currentVariant?.price)}
                </div>

                <div className="py-4">
                    <h2 className="font-medium text-sm pb-2">Frame Color</h2>
                    <div className="grid grid-cols-5 gap-1">
                        {variants?.map((variant) => (
                            <VariantSelector
                                key={variant.sku}
                                variant={variant}
                                onChange={(value) =>
                                    onChange({ type: "frame", value })
                                }
                            />
                        ))}
                    </div>
                </div>
                <div className="py-4">
                    <h2 className="font-medium text-sm pb-2">
                        Saddles options
                    </h2>
                    <div className="flex flex-col gap-1">
                        {currentVariant?.saddles?.map((saddle) => (
                            <div
                                role="button"
                                key={saddle.sku}
                                onClick={() =>
                                    onChange({
                                        type: "saddle",
                                        value: saddle.sku,
                                    })
                                }
                                className={`bg-white overflow-hidden border border-solid cursor-pointer shadow rounded flex items-center ${
                                    skus.saddle === saddle.sku
                                        ? "border-green-500 "
                                        : "border-transparent"
                                }`}
                            >
                                <div className="w-16">
                                    <Image
                                        src={saddle.imageUrl}
                                        alt={saddle.name}
                                        width="64"
                                        height="43"
                                        loading="eager"
                                    />
                                </div>
                                <div className="text-[13px]">{saddle.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="py-4">
                    <h2 className="font-medium text-sm pb-2">Grip options</h2>
                    <div className="flex flex-col gap-1">
                        {currentVariant?.grips?.map((grip) => (
                            <div
                                role="button"
                                key={grip.sku}
                                onClick={() =>
                                    onChange({ type: "grip", value: grip.sku })
                                }
                                className={`bg-white overflow-hidden border border-solid cursor-pointer shadow rounded flex items-center ${
                                    skus.grip === grip.sku
                                        ? "border-green-500 "
                                        : "border-transparent"
                                }`}
                            >
                                <div className="w-16 flex justify-center">
                                    <Image
                                        className="w-10"
                                        src={grip.imageUrl}
                                        alt={grip.name}
                                        width="40"
                                        height="50"
                                        loading="eager"
                                    />
                                </div>
                                <div className="text-[13px]">{grip.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="py-4">
                    <h2 className="font-medium text-sm pb-2">Accessories</h2>
                    <div className="flex flex-col gap-1">
                        {options?.map((option) => {
                            const isSelected = !!skus[option.id];
                            const isBagDisabled =
                                option.id === "leatherBag" &&
                                skus.grip &&
                                skus.grip !== "natural-leather";

                            return (
                                <div
                                    key={option.id}
                                    role="button"
                                    onClick={() =>
                                        !isBagDisabled &&
                                        onChange({
                                            type: option.id,
                                            value: isSelected
                                                ? undefined
                                                : option.sku,
                                        })
                                    }
                                    className={`bg-white overflow-hidden border border-solid shadow rounded flex items-center ${
                                        isSelected
                                            ? "border-green-500 "
                                            : "border-transparent"
                                    } ${
                                        isBagDisabled
                                            ? "opacity-50 cursor-default"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    <div className="w-16 flex justify-center">
                                        <Image
                                            className="w-16"
                                            src={option.imageUrl}
                                            alt={option.name}
                                            width="64"
                                            height="43"
                                            loading="eager"
                                        />
                                    </div>
                                    <div className="text-[13px]">
                                        <span>{option.name}</span>
                                        <span>
                                            {/* {priceFormatter(options.defaultVariant.defaultPrice)} */}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

{
    /* <div className="font-bold">Saddle Color</div>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .setSaddleColor("Blue-City")
  }
>
  Blue
</button>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .setSaddleColor("Cognac-Leather")
  }
>
  Cognac
</button>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .setSaddleColor("Natural-Leather")
  }
>
  Natural
</button>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .setSaddleColor("Maroon-Leather")
  }
>
  Maroon
</button>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .setSaddleColor("Black-Leather")
  }
>
  Black
</button>

<div className="font-bold">Front Rack</div>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .toggleLuggageRackFront(true)
  }
>
  On
</button>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .toggleLuggageRackFront(false)
  }
>
  Off
</button>

<div className="font-bold">Lugguage Rack</div>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .toggleLuggageRackBack(true)
  }
>
  On
</button>
<button
  onClick={() =>
    document
      .getElementById("threeDViewer")
      .toggleLuggageRackBack(false)
  }
>
  Off
</button>
<div className="font-bold">Leather Bag</div>
<button
  onClick={() =>
    document.getElementById("threeDViewer").toggleLeatherBag(true)
  }
>
  On
</button>
<button
  onClick={() =>
    document.getElementById("threeDViewer").toggleLeatherBag(false)
  }
>
  Off
</button> */
}

// <button
// onClick={() =>
//   document.getElementById("threeDViewer").setFrameColor("Light-Green")
// }
// >
// Copper Patina
// </button>
// <button
// onClick={() =>
//   document
//     .getElementById("threeDViewer")
//     .setFrameColor("Antique-Pink")
// }
// >
// Antique-Pink
// </button>
// <button
// onClick={() =>
//   document.getElementById("threeDViewer").setFrameColor("Dusty-Gray")
// }
// >
// Midsummer Black
// </button>
// <button
// onClick={() =>
//   document.getElementById("threeDViewer").setFrameColor("Sun-Yellow")
// }
// >
// Karma Yellow
// </button>
// <button
// onClick={() =>
//   document.getElementById("threeDViewer").setFrameColor("Azure-Blue")
// }
// >
// Petroleum Blue
// </button>
