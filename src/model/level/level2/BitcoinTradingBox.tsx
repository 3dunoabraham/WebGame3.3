import TradingBox from "@/model/npc/TradingBox"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"

function Component ({
    

// export default function Component({
  hasAnyToken,
  toggleTrade,
  selectedToken,
  $bitcoin,
  tokensArrayObj,
  $turnOn,
  turnOn,
  turnOff,
  leave,
  join,
  trendDown,
  trendUp,
  tokensArrayArray,
  unselectedColor="#48721E",
  refetchInterval=3000,
  form= null,
  token= "btc",
  timeframe= "3m",
  wallWidth=0.1,
  position=[0,0,0],
  boundaries=[1,1,1],
  onTextClick=()=>{},
  onTimeframeClick=()=>{},
  score=0,s__score=()=>{},
  velocityX=0, setVelocityX=()=>{},
  velocityY=0, setVelocityY=()=>{},
}: any) {
  const [btcBoxPos, s__btcBoxPos]:any = useState([-0.6,-0.1,-0.5])
  useFrame(()=>{
        if (!$bitcoin.current) return 
    
        // if (!hasAnyToken) {
        //   $bitcoin.current.position.x = 0
        // } else {
        //   $bitcoin.current.position.x = -0.5
        // }
      })
      
    return (
        <group position={btcBoxPos} rotation={[0,0,0]} ref={$bitcoin}>
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" 
            tokensArrayArray={"btc" in tokensArrayObj ? tokensArrayObj["btc"] : null}
            refetchInterval={selectedToken == "btc" ? 4000 : 60000}
            unselectedColor={"#50545B"}
            onTextClick={()=>{onTextClick("btc")}} 
            setVelocityY={(data:any)=>{toggleTrade("btc",data)}}
            turnOn={(e:any)=>{turnOn("btc");  e.stopPropagation && e.stopPropagation()}} turnOff={(e:any)=>{turnOff("btc");  e.stopPropagation && e.stopPropagation()}}
            join={(e:any)=>{join("btc");  e.stopPropagation && e.stopPropagation()}} leave={(e:any)=>{leave("btc");  e.stopPropagation && e.stopPropagation()}}
            trendDown={()=>{trendDown("btc")}} trendUp={()=>{trendUp("btc")}} 
            onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("btc",tf)}}
            /> 
        </group>  
    )
}

export default Component