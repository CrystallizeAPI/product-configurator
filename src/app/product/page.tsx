"use client"

import { Metadata } from 'next'
import Script from 'next/script'

function ProductRender() {
  return <div className="bg-white col-span-3">
          <model-viewer 
            id="threeDViewer"
            src="https://cdn2.charpstar.net/ConfigFiles/Crystallize/SpeedCurve/SpeedCurve.glb"
            field-of-view="45deg" 
            camera-orbit="-145deg 75deg"
            interaction-prompt = "none"
            camera-controls
            shadow-intensity="4" 
            shadow-softness="1"
            exposure="1.3" 
            environment-image="https://cdn2.charpstar.net/HDR/HDRI-Default.hdr">
       </model-viewer>
  </div>;
}

function ProductSidebar() {
  return <div className="col-span-1">
    <h2 className="text-2xl font-bold">Speed Curve</h2>
    <p>
      A classic curved bicycle re-imageined and engineered in modern materials.
      No plastic.
    </p>
    <div className=" font-bold">2 990 EUR</div>
    <div className="flex flex-col">
          <div className="font-bold">Frame Color</div>
          <button onClick={() => document.getElementById("threeDViewer").setFrameColor('Light-Green')}>
            Copper Patina
          </button>
          <button onClick={() => document.getElementById("threeDViewer").setFrameColor('Antique-Pink')}>
            Antique-Pink
          </button>
          <button onClick={() => document.getElementById("threeDViewer").setFrameColor('Dusty-Gray')}>
            Midsummer Black
          </button>                    
          <button onClick={() => document.getElementById("threeDViewer").setFrameColor('Sun-Yellow')}>
            Karma Yellow
          </button>
          <button onClick={() => document.getElementById("threeDViewer").setFrameColor('Azure-Blue')}>
            Petroleum Blue
          </button>
        <div className="font-bold">Saddle Color</div>
          <button onClick={() => document.getElementById("threeDViewer").setSaddleColor('Blue-City')}>
            Blue
          </button>
          <button onClick={() => document.getElementById("threeDViewer").setSaddleColor('Cognac-Leather')}>
            Cognac
          </button>
          <button onClick={() => document.getElementById("threeDViewer").setSaddleColor('Natural-Leather')}>
            Natural
          </button>                    
          <button onClick={() => document.getElementById("threeDViewer").setSaddleColor('Maroon-Leather')}>
            Maroon
          </button>
          <button onClick={() => document.getElementById("threeDViewer").setSaddleColor('Black-Leather')}>
            Black
          </button>

          <div className="font-bold">Front Rack</div>
          <button onClick={() => document.getElementById("threeDViewer").toggleLuggageRackFront(true)}>
           On
          </button>
          <button onClick={() => document.getElementById("threeDViewer").toggleLuggageRackFront(false)}>
           Off
          </button>

          <div className="font-bold">Lugguage Rack</div>
          <button onClick={() => document.getElementById("threeDViewer").toggleLuggageRackBack(true)}>
           On
          </button>
          <button onClick={() => document.getElementById("threeDViewer").toggleLuggageRackBack(false)}>
           Off
          </button>
          <div className="font-bold">Leather Bag</div>
          <button onClick={() => document.getElementById("threeDViewer").toggleLeatherBag(true)}>
           On
          </button>
          <button onClick={() => document.getElementById("threeDViewer").toggleLeatherBag(false)}>
           Off
          </button>          
    </div>        
  </div>;
}

export default function Page() {
  return ( 
    <>
    <div className="m-4 h-52">
      <h1 className="text-3xl font-bold">Design your own Speed Curve bike</h1> 
        <div className="grid grid-cols-4 gap-4">
          <ProductRender />
          <ProductSidebar />
        </div>
    </div>
    </>
  )
}