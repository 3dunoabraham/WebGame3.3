"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

function Component ({}) {
    // const [asd, s__asd] = useState("")

    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")

    return (<>
    
        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-5 pos-fixed top-0"
                style={{background:"radial-gradient(circle, #666666ee, #333333ee 50%, #000000ee 100%)"}}
            >
                
                <div className="flex gap-2 tx-white pa-2">
                    <div className="flex flex-align-end">
                        <b className="tx-lg block">G</b>amified 
                    </div>
                    <div className="flex flex-align-end">
                        <b className="tx-lg block">T</b>rading 
                    </div>
                    <div className="flex flex-align-end">
                        <b className="tx-lg block">A</b>pplication
                    </div>
                    <div>| Byte City</div>
                </div>

                <div onClick={()=>{s__asd("")}} className="opaci-chov--50">

                    <h1 className="tx-white pa-4 tx-lg" style={{color:"orange"}}>Go Back to Game</h1>
                </div>
                <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-stretch">
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Register / Dashboard:
                        </div>
                        <div>
                            <a href="https://tresduno.vercel.app/" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lgx py-1 block"
                            >
                                tresduno.vercel.app
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Documentation:
                        </div>
                        <div>
                            <a href="https://3duno.gitbook.io/gtabtc" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lg py-1 block"
                            >
                                3duno.gitbook.io/gtabtc
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Twitter:
                        </div>
                        <div>
                            <a href="https://twitter.com/gta_btc" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-mdl py-1 block"
                            >
                                twitter.com/gta_btc
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    
                    <div className="flex-col mt-8 bord-r-50 pa-4 pb-100 bg-b-5 box-shadow-2-t" >
                        <div className="pb-8">
                            <h2>Controls</h2>
                        </div>
                        <div className="flex-1 flex-col w-100  flex-align-stretch ">
                            <div className="flex-center gap-3 ">
                                <div className="">Left Click</div>
                                <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                <div>Move</div>
                            </div>
                            <div className="flex-center gap-3 ">
                                <div className="">Right Click</div>
                                <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                <div>Rotate Camera</div>
                            </div>
                            <div className="flex-center gap-3 ">
                                <div className="">Scroll</div>
                                <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                <div>Zoom In/Out</div>
                            </div>
                        </div>
                    </div>
                    
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50 tx-center">

                    <h1 className="tx-white pa-8 underline tx-xl" style={{color:"orange"}}>Back to Game</h1>
                </div>
                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='pos-abs bottom-0 translate-y-50 z-999  w-100 tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl opaci-chov--75 bg-black"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-1deg)"}}
            >
                Register | OPEN ALPHA
            </button>
            </div>
        </>}
    </>)
}

export default Component