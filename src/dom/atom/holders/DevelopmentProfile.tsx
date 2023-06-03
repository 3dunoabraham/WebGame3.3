"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAuth } from "../../../../script/state/context/AuthContext";
import { FaExternalLinkAlt } from "react-icons/fa";

function Component ({}) {
    // const [asd, s__asd] = useState("")
    const { user, do:{login, demo}, jwt }:any = useAuth()

    const fullscreen = () => {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      }
    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")

    return (<>
        {false && asd == "landing" && <>
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
                            WebGamed Account:
                        </div>
                        <div>
                            <a href={"/dashboard/?user="+user.email.split("@")[0]} target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lgx py-1 block"
                            >
                                #{user.email.split("@")[0]}
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="my-8"></div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Dashboard:
                        </div>
                        <div>
                            <a href="https://webgamed.vercel.app/" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lgx py-1 block"
                            >
                                webgamed.vercel.app
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Documentation:
                        </div>
                        <div>
                            <a href="https://webgamed.gitbook.io/bytecity" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lg py-1 block"
                            >
                                webgamed.gitbook.io/bytecity
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Twitter:
                        </div>
                        <div>
                            <a href="https://twitter.com/bytccity" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-mdl py-1 block"
                            >
                                twitter.com/bytcCity
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Twitter:
                        </div>
                        <div>
                            <a href="https://twitter.com/webgamed" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-mdl py-1 block"
                            >
                                twitter.com/WebGamed
                            </a>
                        </div>
                        <div className="pb-1 bg-w-10 flex-1"></div>
                    </div>
                    <div className="my-8"></div>
                    
                    {/* <div className="flex-col mt-8 bord-r-50 pa-4 pb-100 bg-b-5 box-shadow-2-t" >
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
                    </div> */}
                    
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50 tx-center">

                    <h1 className="tx-white pa-8 underline tx-xl" style={{color:"orange"}}>Back to Game</h1>
                </div>
                </div>
            </div>
        </>}
        {false && asd !== "landing" && <>
            <div className='pos-abs bottom-0 translate-y-100 z-999  w-100 tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl scale-hov-150 bg-black"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                <small className="tx-smd">Welcome to <br /> Byte City Alpha</small>
                {/* , <br /> {user.email}! */}
            </button>
            </div>
        </>}




        

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

                <div>
                        <div className="tx-red" onClick={fullscreen}>fullscreen</div>
                </div>

                <div onClick={()=>{s__asd("")}} className="opaci-chov--50">

                    <h1 className="tx-white pa-4 tx-lg" style={{color:"orange"}}>Go Back to the Game</h1>
                </div>
                <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-start ">
                    <div className="flex gap-3"  style={{background:"orangered"}}>
                        {/* <div className=" gap-1 flex flex-align-end">
                            Register @
                        </div> */}
                        <div className="box-shadow-2-b">
                            <a href="https://webgamed.vercel.app/" target="_blank"
                                className=" opaci-chov--50 tx-lgx py-1 block px-4 py-2 box-shadow-i-2-t tx-white"
                            >
                                WebGamed Dashboard
                                <span className="pa-2 opaci-50"><FaExternalLinkAlt/></span>
                            </a>
                        </div>
                        {/* <div className="pb-1 bg-w-10 flex-1"></div> */}
                    </div>
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Documentation:
                        </div>
                        <div>
                            <a href="https://webgamed.gitbook.io/gtabtc" target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-mdl py-1 block"
                            >
                                webgamed.gitbook.io/gtabtc
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
                    <div className="flex-center gap-3" >
                        <div className=" gap-1 flex flex-align-end">
                            Dashboard / Profile:
                        </div>
                        <div>
                            <a href={"/dashboard/?user="+user.email.split("@")[0]} target="_blank"
                                style={{color:"#0099ff"}}
                                className=" opaci-chov--50 tx-lgx py-1 block"
                            >
                                #{user.email.split("@")[0]}
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
                    
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50 tx-center pos-abs bottom-0 mb-8  right-0">

                    <h1 className="tx-white pa-8  tx-xl" style={{color:"orange"}}>Back to Game</h1>
                </div>
                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='pos-abs bottom-0 translate-y-100 z-999  w-100 tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl scale-hov-150 bg-black"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                <small className="tx-smd">Welcome to <br /> Byte City Alpha</small>
                {/* , <br /> {user.email}! */}
            </button>
            </div>
        </>}


        
    </>)
}

export default Component