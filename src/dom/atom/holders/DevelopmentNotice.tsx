"use client";

import { useState } from "react";

function Component ({}) {
    const [asd, s__asd] = useState("")

    return (<>
    
        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-5 pos-fixed top-0"
                style={{background:"radial-gradient(circle, #666666ee, #333333ee 50%, #000000ee 100%)"}}
            >
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50">

                    <h1 className="tx-white pa-8 tx-xl" style={{color:"orange"}}>Back to Game</h1>
                </div>
                <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-stretch">
                    <div className="flex" >
                        <div className="flex-1">asd</div>
                        <div>asd</div>
                    </div>
                    <div className="flex" >
                        <div>asd</div>
                        <div className="flex-1">asd</div>
                        <div className="flex-1">asd</div>
                        <div>asd</div>
                    </div>
                    <div className="flex" >
                        <div className="flex-1">asd</div>
                        <div>asd</div>
                    </div>
                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='pos-abs bottom-0 translate-y-50 z-999  w-100 tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-2 my-1 px-4 tx-lg opaci-chov--50 bg-black"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-1deg)"}}
            >
                this app is under heavy development
            </button>
            </div>
        </>}
    </>)
}

export default Component