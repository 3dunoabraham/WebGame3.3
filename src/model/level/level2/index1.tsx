"use client";

import ChartBox from "@/model/npc/ChartBox";
import ByteCityLibertyBank from "./npc/ByteCityLibertyBank";
import ClickToStart from "./tutorial/ClickToStart";

function Level1_Index1 ({state, calls, }:any) {
  
  return (<>
    {/* TUTORIAL */}
    {!state.hasAnyToken && <ClickToStart calls={{join:calls.join}} />}

      {/* CHAPTER 1 */}
      {/* BTC | Bitcoin | Bit Coin */}
      {/* CHAPTER 1 */}
      <ByteCityLibertyBank tokensArrayObj={state.tokensArrayObj} selectedToken={state.selectedToken}
        toggleTrade={(tokenname:any,data:any)=>{calls.toggleTrade("btc",data)}}
        hasAnyToken={state.hasAnyToken} 
        form={state.form} timeframe={state.form.id.split("USDT")[1]} token="btc" 
        tokensArrayArray={"btc" in state.tokensArrayObj ? state.tokensArrayObj["btc"] : null}
        refetchInterval={state.selectedToken == "btc" ? 4000 : 60000}
        unselectedColor={"#50545B"}
        onTextClick={()=>{calls.onTextClick("btc")}} 
        setVelocityY={(data:any)=>{calls.toggleTrade("btc",data)}}
        turnOn={(e:any)=>{calls.turnOn("btc");  e.stopPropagation && e.stopPropagation()}} turnOff={(e:any)=>{calls.turnOff("btc");  e.stopPropagation && e.stopPropagation()}}
        join={(e:any)=>{calls.join("btc");  e.stopPropagation && e.stopPropagation()}} leave={(e:any)=>{calls.leave("btc");  e.stopPropagation && e.stopPropagation()}}
        trendDown={()=>{calls.trendDown("btc")}} trendUp={()=>{calls.trendUp("btc")}} 
        onTimeframeClick={(token:any, tf:any)=>{calls.onTimeframeClick("btc",tf)}}
      />

      {/* CHAPTER X */}
      {state.hasAnyToken && !state.isDefaultUser && !!state.tokensArrayObj[state.selectedToken] && state.isSelectedTokenDowntrend && <>
        <group scale={[0.4,0.4,0.4]}  position={state.chartPos} rotation={state.chartRot}>
          <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={state.selectedTimeframe.toLowerCase() || "1d"}
            position={[0,0,0]} velocityX={0}  theToken={state.form.id.split("USDT")[0]} askAI={(data:any)=>{calls.askAI(data)}}
            velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos:state.chartBoxPos, s__chartBoxPos:calls.s__chartBoxPos}}
            tokensArrayObj={state.tokensArrayObj}
          />
        </group>
      </>}
  </>)
}

export default Level1_Index1