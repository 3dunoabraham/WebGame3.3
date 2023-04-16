"use client";

import Scene from "@/model/core/Scene"
import SceneLight from "@/model/core/SceneLight";
import TradingBox from "@/model/npc/TradingBox";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

function Component ({}) {
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    useEffect(()=>{
        s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    },[])
    const selectedToken = "btc"
    const form = {
        id:"BTCUSDT3M"
    }

    const xOut = 0
    const yOut = 0
    const zOut = 0

    const asd = () => {  }
    const asd1 = () => {  }
    const onTimeframeClick = (x:any, y:any) => {  }
    const join = (x:any) => {  }
    const leave = (x:any) => {  }
    const trendDown = (x:any) => {  }
    const trendUp = (x:any) => {  }
    const turnOn = (x:any) => {  }
    const turnOff = (x:any) => {  }
    const toggleTrade = (x:any, y:any) => {  }
    const onTextClick = (x:any) => {  }

    return (
        <>
            <Scene>

                <SceneLight />
                
                {/* <ActBuySell /> */}
                <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc"
                    refetchInterval={selectedToken == "btc" ? 1000 : 60000}
                    position={[0,0,0]} 
                    // position={[xOut/2,-0.35,-zOut/2]} 
                    onTextClick={()=>{onTextClick("btc")}} unselectedColor={"#50545B"}
                    setVelocityY={(data:any)=>{toggleTrade("btc",data)}}
                    turnOn={()=>{turnOn("btc")}} turnOff={()=>{turnOff("btc")}}
                    join={()=>{join("btc")}} leave={()=>{leave("btc")}}
                    trendDown={()=>{trendDown("btc")}} trendUp={()=>{trendUp("btc")}} onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("btc",tf)}}
                    tokensArrayArray={"btc" in tokensArrayObj ? tokensArrayObj["btc"] : null}
                /> 

            </Scene>

        </>
    )
}

export default Component