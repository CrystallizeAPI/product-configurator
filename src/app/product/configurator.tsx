"use client";

import { useState, useEffect, useRef } from "react";
import VariantSelector from "./components/variant-selector";
const priceFormatter = ({ currency, price }) => {
  return price.toLocaleString("en-US", { style: "currency", currency });
};

export default function Configurator({ product }) {
  const [current, setCurrent] = useState({
    variant: null,
    frameAttribute: "Light-Green",
    saddles: [],
    grips: [],
  });
  const modelViewer = useRef(null);
  const { variants, components } = product;
  const options = components.find((c) => c.id === "options")?.content?.items;

  const changeFrame = (variant, attribute) => {
    const saddles =
      variant.components.find((c) => c.id === "saddle-options")?.content
        ?.productVariants ?? [];
    const grips =
      variant.components.find((c) => c.id === "grip-options")?.content
        ?.productVariants ?? [];

    setCurrent({
      ...current,
      variant,
      frameAttribute: attribute,
      saddles,
      grips,
    });
    modelViewer.current.setFrameColor(attribute);
  };

  useEffect(() => {
    const saddles =
      product.variants?.[0].components.find((c) => c.id === "saddle-options")
        ?.content?.productVariants ?? [];
    const grips =
      product.variants?.[0].components.find((c) => c.id === "grip-options")
        ?.content?.productVariants ?? [];
    setCurrent({
      ...current,
      grips,
      saddles,
      selectedSaddle: saddles[0],
      selectedGrip: grips[0],
      variant: product.variants[0],
    });
  }, [product]);

  // const [value, setValue] = useState(0);
  // const hideAll = () => {
  //   const materials = modelViewer.current.model.materials;
  //   materials[value].setAlphaMode("MASK");
  //   materials[value].pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0]);
  // };

  const genericToggler = {
    // viewer.toggleLuggageRackFront(true)
    // viewer.toggleLuggageRackBack(condition)
    // viewer.toggleLeatherBag(condition)
  };
  return (
    <div className="flex min-h-[100vh] bg-[#F7F6F9] relative  items-center justify-between min-w-full ">
      <div className="h-screen w-screen relative">
        <model-viewer
          ref={modelViewer}
          src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/SpeedCurve.glb"
          camera-orbit="-135deg 0 0"
          // camera-target="-0.4m 0.5m 0"
          camera-controls
          shadow-intensity="4"
          shadow-softness="1"
          exposure="1.3"
          environment-image="https://cdn2.charpstar.net/HDR/HDRI-Default.hdr"
        />
        <div className="from-[#F7F6F9] to-transparent absolute bg-gradient-to-l h-screen w-52 top-0 right-0 z-1 pointer-events-none" />
      </div>
      <div className="px-12 h-screen py-12">
        <h2 className="text-2xl font-medium text-gray-600">{product.name}</h2>
        <p className="font-medium text-gray-600">
          A classic curved bicycle re-imageined and engineered in modern
          materials. No plastic.
        </p>
        <div className="text-xl py-4 font-medium">
          {priceFormatter({ price: 2990, currency: "EUR" })}
        </div>
        {/* <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={() => hideAll()}>Hide</button> */}

        <div className="py-4">
          <h2 className="font-medium text-sm pb-2">Frame Color</h2>
          <div className="grid grid-cols-5 gap-1">
            {variants.map((v) => {
              return (
                <VariantSelector
                  variant={v}
                  key={v.sku}
                  current={current}
                  changeFrame={changeFrame}
                />
              );
            })}
          </div>
        </div>
        <div className="py-4">
          <h2 className="font-medium text-sm pb-2">Saddles options</h2>
          <div className="flex flex-col gap-1">
            {current.saddles.map((saddle) => (
              <div
                className="bg-white overflow-hidden cursor-pointer shadow rounded flex items-center"
                key={saddle.sku}
              >
                <div className="w-16 ">
                  <img src={saddle.firstImage.url} alt={saddle.name} />
                </div>
                <div className="text-[13px]">{saddle.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h2 className="font-medium text-sm pb-2">Grip options</h2>
          <div className="flex flex-col gap-1">
            {current.grips.map((grip) => (
              <div
                className="bg-white overflow-hidden cursor-pointer shadow rounded flex items-center"
                key={grip.sku}
              >
                <div className="w-16 flex justify-center">
                  <img
                    className="w-10"
                    src={grip.firstImage.url}
                    alt={grip.name}
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
            {options.map((option) => (
              <div
                className="bg-white overflow-hidden cursor-pointer shadow rounded flex items-center"
                key={option.name}
              >
                <div className="w-16 flex justify-center">
                  <img
                    className="w-16"
                    src={option.defaultVariant.firstImage.url}
                    alt={option.name}
                  />
                </div>
                <div className="text-[13px]">
                  <span>{option.name}</span>
                  <span>
                    {/* {priceFormatter(options.defaultVariant.defaultPrice)} */}
                  </span>
                </div>
              </div>
            ))}
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
