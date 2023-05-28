"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

function Component ({}) {
    // const [asd, s__asd] = useState("")

    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")

    return (<>
    
        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-5 pos-fixed flex-col top-0"
                style={{background:"linear-gradient(180deg, #666666ee, #333333ee 50%, #000000ee 100%)"}}
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

                    <h1 className="tx-white pa-4 tx-lg" style={{color:"orange"}}>Go Back to the Game</h1>
                </div>
                <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-start ">
                    <div className="flex gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Register:
                        </div>
                        <div>
                            <a href="https://webgamed.vercel.app/" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lgx py-1 block"
                            >
                                webgamed.vercel.app
                            </a>
                        </div>
                        {/* <div className="pb-1 bg-w-10 flex-1"></div> */}
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Documentation:
                        </div>
                        <div>
                            <a href="https://3duno.gitbook.io/gtabtc" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-mdl py-1 block"
                            >
                                3duno.gitbook.io/gtabtc
                            </a>
                        </div>
                        {/* <div className="pb-1 bg-w-10 flex-1"></div> */}
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
                    <details>
                        <summary className="pt-6 pb-2 opaci-chov--50 ">
                            <button className="noclick tx-white">Controls</button>
                        </summary>
                        <div className="flex-col  bord-r-50 pa-8   bg-b-5 box-shadow-i-2-t  w-max-600px" >
                            <div className="flex-1 flex-col w-100 gap-2  flex-align-stretch ">
                                <div className="flex-center gap-3 ">
                                    <div className="gap-1 flex-col">
                                        <div className="gap-1 flex">
                                            <div className="px-2 py-2 _ddr"></div>
                                            <div className="px-2 py-2 bg-white"></div>
                                        </div>
                                        <div className="px-4 py-4 bg-white"></div>
                                    </div>
                                    <div className="">Left Click Drag</div>
                                    <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                    <div className="tx-red tx-lg">Move</div>
                                </div>
                                <div className="flex-center gap-3 ">
                                    <div className="">Right Click Drag</div>
                                    <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                    <div>Rotate Camera</div>
                                </div>
                                <div className="flex-center gap-3 ">
                                    <div className="">Scroll In/Out</div>
                                    <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                    <div>Zoom In/Out</div>
                                </div>
                                <div className="flex-center gap-3 ">
                                    <div className="">F5</div>
                                    <div className="flex-1 w-min-50px opaci-10 border-lgrey my-1"></div>
                                    <div>Refresh</div>
                                </div>
                            </div>
                        </div>
                    </details>
                    
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50 tx-center pos-abs bottom-0 right-0">

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