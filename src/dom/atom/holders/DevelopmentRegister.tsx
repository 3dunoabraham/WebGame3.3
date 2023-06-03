"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaExternalLinkAlt, FaPause, FaPauseCircle, FaRecycle, FaCity, FaArrowDown, FaBook, FaTwitter, FaUser } from "react-icons/fa";
import Image from 'next/image';

function Component ({}) {
    // const [asd, s__asd] = useState("")

    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")

    return (<>
        
        {/* <div className="tx-red w-100 flex flex-justify-between flex-1 _ddb ">
            <div>test</div>
            <div>test 1 </div>
            <div>test 12</div>
        </div>
        {asd == "" && <>
            <div className=' tx-white tx-shadow-2 _ddg z-1001 pos-abs bottom-0 left-0 w-100'>
                <div className="flex w-100 flex-justify-between">
                    <div>test</div>
                    <div>test 1 </div>
                    <div>test 12</div>
                </div>
            </div>
        </>} */}

        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-5 pos-fixed flex-col top-0"
                style={{background:"linear-gradient(185deg, #34AEFB77, #8FD5F4 80%, #34AEFB 100%)"}}
            >
                
                {/* <div className="flex gap-2 tx-white pa-2">
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
                </div> */}

                <div onClick={()=>{s__asd("")}} className="opaci-chov--50">

                    <h1 className="tx-white pa-4 tx-lgx tx-shadow-5" style={{color:"orange"}}>Go Back to the Game</h1>
                </div>
                <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-start ">
                    
                <div className="flex-wrap gap-3">

                <a href="https://webgamed.gitbook.io/bytecity" target="_blank"
                    style={{color:"#004488"}}
                    className=" opaci-chov--50 flex-col px-2 bg-w-90 bord-r-10 py-3"
                >
                    {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                        Documentation:
                    </div> */}
                    <div className="tx-lgx"><FaBook /></div>
                    <div className="tx-sm tx-center">webgamed <br /> .gitbook.io <br /> <b className="tx-mdl">/bytecity</b></div>
                </a>
                <a href="https://twitter.com/gta_btc" target="_blank"
                style={{color:"#004488"}}
                className=" opaci-chov--50 flex-col px-2 bg-w-90 bord-r-10 py-3"
                >
                {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                    Twitter:
                </div> */}
                <div className="tx-lgx"><FaTwitter /></div>
                <div className="tx-sm tx-center">twitter <br />  .com <br /> <b className="tx-mdl">/bytecty</b></div>

                </a>
                <a href="https://twitter.com/gta_btc" target="_blank"
                style={{color:"#004488"}}
                className=" opaci-chov--50 flex-col px-2 bg-w-90 bord-r-10 py-3"
                >
                {/* <div className=" gap-1 flex flex-align-end tx-shadow-5 tx-white">
                    Twitter:
                </div> */}
                <div className="tx-lgx"><FaTwitter /></div>
                <div className="tx-sm tx-center">twitter <br />  .com <br /> <b className="tx-mdl">/bytecty</b></div>

                </a>
                </div>
                    <details>
                        <summary className="pt-6 pb-2 opaci-chov--50 ">
                            <button className="noclick tx-white">Controls</button>
                        </summary>
                        <div className="flex-col box-shadow-5-b bord-r-50   bg-b-5 noverflow  w-max-600px" >
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
                    
                <div onClick={()=>{s__asd("")}} className="opaci-chov--50 tx-center flex-align-end pos-abs bottom-0 mb-8  right-0 flex-col">
                    <div className="pa-8 pb-0 tx-shadow-5 tx-lx flex-center gap-2">
                        {/* <FaArrowDown /> */}
                        Resume
                        <div className="box-shadow-2-b py-0 pa-1 block bord-r-10" style={{background:"#ffffff"}}>
                            <Image src={"/bytecity.png"} alt="bytecity" width={50} height={50} />
                        </div>
                    </div>
                    <h1 className="tx-white tx-shadow-5 pa-8 pt-0 hover-4 tx-lx" style={{color:"orange "}}>
                         Back to Game ↑
                    </h1>
                </div>
                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='pos-abs bottom-0 translate-y-100 z-999  w-100 tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl opaci-chov--75 bg-black scale-hov-150"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                Register | OPEN ALPHA
            </button>
            </div>
        </>}
    </>)
}

export default Component