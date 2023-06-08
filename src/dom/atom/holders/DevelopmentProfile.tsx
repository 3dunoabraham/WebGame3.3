"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaExternalLinkAlt, FaPause,FaStar, FaPauseCircle, FaRecycle, FaCity, FaArrowDown, FaBook, FaTwitter, FaUser } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";

function Component ({}) {
    // const [asd, s__asd] = useState("")
    
    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")

    const setFullscreen = () => {
        document.documentElement.requestFullscreen();
        
      }

      

      const [isFullscreen, setIsFullscreen] = useState(false);
    return (<>

        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-5 pos-fixed flex-col flex-justify-start top-0"
                style={{background:"linear-gradient(185deg, #34AEFB77, #8FD5F4 80%, #34AEFB 100%)"}}
            >
                
                <div onClick={()=>{setFullscreen()}} className="opaci-chov--50">

                <div className="tx-lg tx-bold-2 bg-white tx-white py-2 px-4 bord-r-50 mt-2  tx-lgx tx-shadow-5" style={{color:"#00ff00"}}>Set FullScreen</div>
                </div>
                <div className="pt-100 pb-8 "></div>
                {/* <div onClick={()=>{s__asd("")}} className="opaci-chov--50">

                    <h1 className="Q_sm_x tx-white pa-4 tx-lgx tx-shadow-5" style={{color:"orange"}}>Click Here to <br /> Go Back to the Game</h1>
                </div> */}
                
               <Link className="flex-col pos-abs   opaci-chov--50  mt-8 pt-7" 
                 href="https://webpov.vercel.app/"
                 style={{transform:"translateX(15%)"}}
                >
                    {/* <div   style={{background:"orangered"}}
                        className="  tx-lgx py-1 block px-4 py-2 box-shadow-i-2-t tx-white flex"
                    >
                        Register <div className="invisible">WebGamed</div>
                    </div> */}
                    
                    <div style={{color:"white", 
                    // textShadow:"1px 1px 0 orangered, -1px -1px 0 orangered "
                    textShadow:"1px 1px 0 orangered, 2px 2px 0 orangered "
                }} className=" tx-bold-8  opaci-75 tx-   translate-y-50 tx-ls-1 pr-8 flex flex-align-start gap-2"
                    
                    >
                        Dashboard
                    </div>
                    <div className="pr-100" style={{ width: "10px", height: "10px", transformStyle: "preserve-3d", transform:"rotateX(15deg) rotateY(20deg)", margin: "25px" }}>
                        <div className="tx-bold-8 tx-white x flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(25px)" }}>
                            Byte
                            City
                        </div>
                        <div className="tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(-25px) rotateY(180deg)" }}>
                            Web
                        </div>
                        <div className="tx-bold-8 g pl-2 tx-sm tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(-25px) rotateY(-90deg)" }}>
                            Web
                            Gamed
                        </div>
                        <div className="tx-white g flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(25px) rotateY(90deg)" }}>
                            beW
                            demaG
                        </div>
                        <div className="tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(-25px) rotateX(90deg)" }}>
                            as above {/*  Top */}
                        </div>
                        <div className="tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(25px) rotateX(-90deg)" }}>
                            so below {/*  Bottom */}
                        </div>
                    </div>
                </Link>
                
                {/* <div className=" tx-shadow-5 tx-white pb-2 translate-y--50">
                    Links
                </div> */}
                <div className="pb-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-end ">
                    <div className="flex-wrap gap-1 ">

                            <a href="https://webpov.gitbook.io/bytecity" target="_blank"
                                style={{color:"#004488"}}
                                className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                            >
                                {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                                    Documentation:
                                </div> */}
                                <div className="tx-lgx"><FaBook /></div>
                                <div className="tx-sm tx-center Q_sm_x">webgamed <br /> .gitbook.io/ <br />
                                <b className="tx-mdl">bytecity</b></div>
                            </a>
                        <a href="https://twitter.com/gta_btc" target="_blank"
                            style={{color:"#004488"}}
                            className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                        >
                            {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                                Twitter:
                            </div> */}
                            <div className="tx-lgx"><FaTwitter /></div>
                            <div className="tx-sm tx-center Q_sm_x">twitter <br />  .com/ <br />
                            <b className="tx-mdl">bytecty</b></div>
                            
                        </a>
                        <a href="https://twitter.com/gta_btc" target="_blank"
                            style={{color:"#cc44cc"}}
                            className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                        >
                            {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                                Twitter:
                            </div> */}
                            <div className="tx-lgx"><FaStar /></div>
                            <div className="tx-sm tx-center Q_sm_x">webgamed <br />  .vercel.app <br />
                            <b className="tx-mdl">/ranking</b></div>
                            
                        </a>
                        <a href="https://webpov.vercel.app/?user=" target="_blank"
                            style={{color:"#ff8800"}}
                            className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                            >
                            {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                                Twitter:
                            </div> */}
                            <div className="tx-lgx"><FaUser /></div>
                            <div className="tx-sm tx-center Q_sm_x">webgamed <br />  .vercel.app <br />
                            <b className="tx-mdl">?user=...</b></div>

                            </a>
                        </div>
                    <details className="">
                        <summary className="pt-6 pb-2 opaci-chov--50 ">
                            <button className="noclick tx-white">Controls</button>
                        </summary>
                        <div className="flex-col box-shadow-5-b left-50p translate-x--50 bord-r-50  pos-abs w-80 bg-b-5 noverflow  w-max-600px" >
                            <div className="flex-1 flex-col w-100 gap-2 box-shadow-i-2-t pa-8  flex-align-stretch ">
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
                                    <div className="nowrap">Rotate Camera</div>
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
                    
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50 tx-center flex-align-end pos-abs bottom-0 mb-8  right-0 flex-col">
                    <div className="pa-8 pb-0 tx-shadow-5 tx-lx flex-center gap-2">
                        {/* <FaArrowDown /> */}
                        Resume
                        <div className="box-shadow-2-b py-0 pa-1 block bord-r-10" style={{background:"#ffffff"}}>
                            <Image src={"/bytecity.png"} alt="bytecity" width={50} height={50} />
                        </div>
                    </div>
                    <div className="tx-white tx-shadow-5 pa-8 pt-0  tx-lg" style={{color:"orange "}}>
                         Back to Game ↑
                    </div>
                </div>
                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='Q_sm_x pos-abs top-0  z-999  w-100 tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl opaci-chov--75 bg-black scale-hov-150"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                MENU | Byte City Alpha
            </button>
            </div>

            
            <div className='Q_sm_x right-0 pos-abs bottom-0  z-999  tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-2 tx-lgx opaci-chov--75 bg-black "
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(2deg)"}}
            >
                MENU
            </button>
            </div>


            <div className='Q_xs right-0 pos-abs top-0  z-999  tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-2 tx-lgx opaci-chov--75 bg-black "
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                MENU
            </button>
            </div>
        </>}
    </>)
}

export default Component