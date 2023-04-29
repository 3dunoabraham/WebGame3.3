"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Cylinder, OrbitControls } from "@react-three/drei";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";
import { Text } from '@react-three/drei';


import { getComputedLevels } from "../../../../script/util/helper/decoy";
import Scene from "@/model/core/Scene"
import TradingBox, { DEFAULT_TIMEFRAME_ARRAY } from "@/model/npc/TradingBox";
import ChartBox from "@/model/npc/ChartBox";
import MovingBox1 from "./MovingBox1";
import MovingBox2 from "./MovingBox2";
import { parseDecimals } from "../../../../script/util/helper";
import DynaText from "@/model/npc/TradingBox/DynaText";
import BuyLowSellHigh from "./BuyLowSellHigh";
import SetPriceAlarm from "./SetPriceAlarm";
import SellHigh from "./SellHigh";
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import { fetchPost } from "../../../../script/util/helper/fetchHelper";
import ClickToStart from "./ClickToStart";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import BitcoinTradingBox from "./BitcoinTradingBox";
import TutorialGoal from "./TutorialGoal";

const DEFAULT_TOKEN_OBJ = {
  mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
  min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
}
const selectedTimeframeIndex = 0
const selectedTimeframe = "3m"
const feePercent = 0.0
function Component ({}) {
  const [btcBoxPos, s__btcBoxPos]:any = useState([-0.6,-0.1,-0.5])
  const [chartBoxPos, s__chartBoxPos] = useState([0,0,0])
  const $bitcoin:any = useRef()
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const tutoStage:any = useMemo(()=> JSON.parse(_tutoStage) , [_tutoStage])
  // const [tutoStage,s__tutoStage] = useState<any>({})
  const [enablePan, s__enablePan] = useState(true)
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [selectedToken, __selectedToken] = useState("btc")
  const [currentOrders, s__currentOrders] = useState<any>({})
  const [orderHistory, s__orderHistory] = useState<any>([])
  const [profitHistory, s__profitHistory] = useState<any>([])
  const [binanceKeys, s__binanceKeys] = useState<any>("")
  const [form,s__form] = useState({
    id:"BTCUSDT3M",
  })
  const onTimeframeClick = (x:any, y:any) => {  }
  const join = (x:any) => {
      console.log("join", x)
      s__selectedToken(x)

      updateTokenOrder(x,selectedTimeframeIndex,"state",0)
  }
  const leave = (x:any) => {
      console.log("leave", x)
      // updateTokenOrder(token,selectedTimeframeIndex,"state","0")
      s__selectedToken(x)
      
      let new_tokensArrayObj = {...tokensArrayObj};
      delete new_tokensArrayObj[x];
      s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj));
      s__tokensArrayObj(new_tokensArrayObj)
  }
  const trendDown = (x:any) => { 
    console.log("trendDown")
    s__selectedToken(x)
    updateTokenOrder(x,selectedTimeframeIndex,"mode",1)

   }
  const trendUp = (x:any) => { 
    console.log("trendUp")
    s__selectedToken(x)
    updateTokenOrder(x,selectedTimeframeIndex,"mode",0)

   }
  const turnOn = (x:any) => { 
    // console.log("turnon",tutoStage)
    s__selectedToken(x)

    if (!tutoStage.lvl)
    {
      setTutoStage(1)
    }
    // setLiveMode(0)
    updateTokenOrder(x,selectedTimeframeIndex,"state",1)

  }
  const turnOff = (x:any) => {
    console.log("turnoff")
    updateTokenOrder(x,selectedTimeframeIndex,"state",0)
    // setLiveMode(1)
  }
  const s__selectedToken = (val:any) => {
    let newId = val.toUpperCase() + "USDT" + selectedTimeframe.toUpperCase()
    console.log("newId", newId)
    s__form({id:newId})
    __selectedToken(val)
  }
  const toggleTrade = async (x:any, y:any) => {
    
    if (tutoStage.lvl == 1)
    {
      setTutoStage(2)
    }
    if (tutoStage.lvl == 2)
    {
      setTutoStage(3)
    }

    let newTradeObj = {side:!!y.value ? "buy" : "sell",token:x,price:y.price}

    s__orderHistory([...orderHistory, newTradeObj])
    if (form.id in currentOrders) {
      let oldOrders = {...currentOrders}
      if (newTradeObj.side == "sell") {
        let theindex = profitHistory.length
        let newprofithi:any = [...profitHistory, [oldOrders[form.id],newTradeObj]]
        let percentChange:any = newprofithi.price == oldOrders[form.id].price ? 0 : parseFloat(`${newTradeObj.price/oldOrders[form.id].price*100}`).toFixed(2)
        // console.log(newprofithi, newprofithi.price , oldOrders[form.id].price)
        
        newprofithi[theindex].unshift((percentChange-100) > feePercent ? "profit" : "loss")
        newprofithi[theindex].unshift((percentChange-100).toFixed(3))
        console.log("new change", newprofithi[theindex])
        s__profitHistory(newprofithi)
      }
      delete oldOrders[form.id]
      s__currentOrders(oldOrders)
    } else {
      s__currentOrders({...currentOrders, [form.id]: newTradeObj })
    }

    
    // if (newTradeObj.side == "buy")
    {
      {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        let arandomkey = "demo:"+randomThousand
        let keyval = !binanceKeys.length ? prompt("Enter key:secret codes (leave 'demo:<number>' for testing)",arandomkey) : binanceKeys
        
        if (!keyval) {
          s__binanceKeys(arandomkey)
          return
        }

        s__binanceKeys(keyval)
        // side, symbol, quantity:_quantity, price:_price,apiKey,apiSecret
        let fetchObjData = {
          side: newTradeObj.side,
          symbol: x.toUpperCase()+"USDT",
          quantity:"0.001",
          price:newTradeObj.side == "buy" ? newTradeObj.price*1.001 : newTradeObj.price*0.999,
          apiKey: keyval.split(":")[0],
          apiSecret: keyval.split(":")[1]
        }

        console.log("fetchObjData", fetchObjData)
        let fetchRes = await fetchPost("/api/order/place",fetchObjData)
        console.log("fetchRes", fetchRes)
      }
    }

  }
  const onTextClick = (x:any) => { 
    s__selectedToken(x)

  }
  const updateTokenOrder = async (_token:string, timeframe:any, substate:string,val:any="") => {
    if (!_token) return
    // let promptVal = !val ? prompt("Enter Value") : val
    let promptVal = val
    let value = !promptVal ? 0 : parseFloat(promptVal)
    let timeframeIndex = timeframe
    let old_tokensArrayObj:any = null
    if (!tokensArrayObj[_token]) {
      let price = 1
      let new_tokensArrayObj = DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe, index)=> (
        {...DEFAULT_TOKEN_OBJ,...{
          ...getComputedLevels({floor:price*0.8,ceil:price*1.2})
        }}
      ) )
      tokensArrayObj[_token] = new_tokensArrayObj
    }
    let old_tokensArrayObjArray = [...tokensArrayObj[_token]]
    console.log("old", old_tokensArrayObjArray[timeframeIndex])
    console.log("mid", {[substate]:value})
    let newCrystal = {
      ...old_tokensArrayObjArray[timeframeIndex],
      ...{[substate]:value},
      ...getComputedLevels({
        ...old_tokensArrayObjArray[timeframeIndex],
        ...{[substate]:value}
      }),
    }
    console.log("new", newCrystal)
    old_tokensArrayObjArray[timeframeIndex] = {...old_tokensArrayObj,...newCrystal}
    let bigTokensObj = {...tokensArrayObj, ...{[_token]:old_tokensArrayObjArray}}
    s__tokensArrayObj(bigTokensObj)
    s__LS_tokensArrayObj((prevValue) => JSON.stringify(bigTokensObj))
  }
  const hasAnyToken = useMemo(()=>{
      // console.log("tokensArrayObj", tokensArrayObj)
      let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
          // console.log("token", token)
          return token in tokensArrayObj
      })
      // console.log("interestCount", interestCount)
      return interestCount.length > 0
  },[tokensArrayObj])
  const hasAllTokens = useMemo(()=>{
    // console.log("tokensArrayObj", tokensArrayObj)
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
        // console.log("token", token)
        return token in tokensArrayObj
    })
    // console.log("asdasdasdas", interestCount.length , Object.keys(tokensArrayObj).length)
    return interestCount.length == 4
},[tokensArrayObj])
  useEffect(()=>{
    // s__tutoStage(JSON.parse(LS_tutoStage))
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
  },[])
  const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
  const copyToClipboard = ()=>{
      // clipbloard__do(OFFICIAL_URL+"unit/"+newUID)
      // app.alert("neutral","Copied to clipboard")
  }
  const AI_BASE = `
  analyze this data and make a report:
  include trend direction, resistance and support levels.
  each array of the json represents the latest candlestick chart data with only the closing price
  generate the report including all 4 timeframes  \n\n candles data:`
  const [AIdata, s__AIdata] = useState({})
  const askAI = (data:any) => {
      let verbose:any = {
          "3m": "3 minutes between prices",
          "15m": "15 minutes between prices",
          "4h": "4 hours between prices",
          "1d": "1 day between prices",
      }
      let newPrompt:any = AIdata
      newPrompt[verbose[selectedTimeframe.toLowerCase()]] = ([...data]).splice(400,499)
      // newPrompt = AIdata + newPrompt
      s__AIdata(newPrompt)
      // console.clear()
      console.log("newPrompt", newPrompt)
      clipbloard__do(AI_BASE + JSON.stringify(newPrompt))
      console.log("main().catch(console.error)")
      // main().catch(console.error)
      console.log("main().catch(console.error)")
  }
  const setTutoStage = (lvl:any) => {
    // s__tutoStage({lvl})
    s__LS_tutoStage(JSON.stringify({...tutoStage,lvl}))
  }
  const setLiveMode = (demo:any) => {
    // s__tutoStage({lvl})
    s__LS_tutoStage(JSON.stringify({...tutoStage,demo}))
  }
  const turnOffDemo = () => {
    turnOn("btc")
    setTutoStage(1)
  }
  const clickFirstBuy = () => {
    $bitcoin.current.toggleGame()
    setTutoStage(2)
  }
  const clickFirstSell = () => {
    // $bitcoin.current.toggleGame()
    // setTutoStage(3)
  }



  return (<>
    <Scene>
      {enablePan &&
        <MetaOrbitControls minPolarAngle={0.11} maxPolarAngle={1.77} 
            minDistance={1} maxDistance={7}
            enablePan={enablePan}
            basePosition={[0,0,0]}
        />
      }
      {!enablePan &&
        <OrbitControls minPolarAngle={0.11} maxPolarAngle={1.77} 
            minDistance={1} maxDistance={7}
            enablePan={false}
            
        />
      }
      <ambientLight intensity={0.25} />
      <pointLight intensity={1.5} position={[1.5, 1, 3]} castShadow />


      {!hasAnyToken && <>
        <ClickToStart calls={{join}} />
      </>}
      {hasAnyToken && !tutoStage.lvl &&
      
        <group position={[-0.42,-0.35,-0.24]} scale={0.3} onClick={()=>{turnOffDemo()}}>
          <SetPriceAlarm />
        </group>
      }
      {hasAnyToken && tutoStage.lvl == 1 &&
      
      <group position={[-0.7,-0.24,-0.5]} scale={0.35} >
      <BuyLowSellHigh />
    </group>
      }

{hasAnyToken && tutoStage.lvl == 2 &&
        
        <group position={[-0.7,-0.24,-0.5]} scale={0.35} >
        <SellHigh />
      </group>
        }
        {hasAnyToken && tutoStage.lvl == 3 &&
          
        <group position={[-0.31,-0.35,-1.9]} scale={0.35} >
        <TutorialGoal />
      </group>
        }

      {hasAllTokens && <>
        <Box args={[4,0.25,5]} position={[0,-1.2,-0.5]} castShadow receiveShadow>
          <meshStandardMaterial color={ "#fff"}/>
        </Box>
      </>}
        <Box args={[2.5,0.2,2.5]} position={[0.05,-1.05,0.15]} castShadow receiveShadow>
          <meshStandardMaterial color={"#fff"}/>
        </Box>
        
        <Cylinder args={[0.01,0.01,0.2,6]} position={[2,2.05,2]} castShadow receiveShadow 
          onClick={()=>{s__LS_tutoStage("{}");s__LS_tokensArrayObj("{}");window.location.reload()}}
        >
          <meshStandardMaterial color={"#f00"}/>
        </Cylinder>
      {hasAnyToken && <>
        <Cylinder args={[0.1,0.1,0.2,6]} position={[0,!enablePan?-1:-0.95,0]} castShadow receiveShadow 
          onClick={()=>{s__enablePan(!enablePan)}}
        >
          <meshStandardMaterial color={!enablePan ? "#f99" : "#999"}/>
        </Cylinder>
        
        <DynaText
          // onClick={()=>{join("btc")}}
          text={"Lock Camera"}
          color={!enablePan ? "#a55" : "#977"}
          font={0.06}
          position={[0,-0.94,-0.17]} 
          
        >        
      </DynaText>
      </>}


      {/* goal post */}
      {hasAnyToken && <group position={[0,0,-1.5]}>
        <Cylinder args={[0.25,0.25,0.75,12]} position={[0,-0.9,0]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#ccc"}/>
        </Cylinder>
        
        {/* <DynaText
          // onClick={()=>{join("btc")}}
          text={"Reward"}
          color={!enablePan ? "#a55" : "#977"}
          font={0.06}
          position={[0,-0.94,-0.17]} 
          
        >        
      </DynaText> */}
      </group>}



        {/* <Box args={[0.1,0.1,0.4]} position={[0.05,-1,-1.7]} castShadow receiveShadow rotation={[enablePan ? 0.5 : -0.5,0,0]}
          onClick={()=>{s__enablePan(!enablePan)}}
        >
          <meshStandardMaterial color={enablePan ? "#a55" : "#977"}/>
        </Box> */}
{/*         
        <DynaText
          // onClick={()=>{join("btc")}}
          text="Open World"
          color={enablePan ? "#a55" : "#977"}
          font={0.06}
          position={[0.05,-0.89,-1.76]} 
          rotation={[0,Math.PI,0]}
        >        
      </DynaText> */}
      {hasAnyToken && <>
      <group position={[-0.15,-0.55,-1.5]}>
        {profitHistory.slice(0,5).map((anOrder:any, index:any)=>{
          return (
            <Box args={[0.07,0.11,0.07]} position={[index*0.075,0.01,0]}  castShadow receiveShadow key={index}>
              <meshStandardMaterial color={anOrder[1] != "profit" ? "#f00" : "#ccc"}/>
            </Box>
          )
        })}
        {profitHistory.slice(0,5).map((anOrder:any, index:any)=>{
          return (
            <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.01,0]}  castShadow receiveShadow key={index}>
              <meshStandardMaterial color={anOrder[1] != "profit"  ? "#aaaaaa" : "#33aa33"}
              />
            </Box>
          )
        })}
        {[0,1,2,3,4].map((anOrder:any, index:any)=>{
          return (
            <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.01,0]}  castShadow receiveShadow key={index}>
              <meshStandardMaterial color={"#339933"}
                transparent={true} opacity={0.33}
              />
            </Box>
          )
        })}
      </group>
      </>}


      {hasAnyToken && <>
        <group scale={[0.7,0.7,0.7]} >
          <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={selectedTimeframe.toLowerCase() || "1d"}
            position={[0,0,0]} velocityX={0}  theToken={form.id.split("USDT")[0]} askAI={(data:any)=>{askAI(data)}}
            velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos, s__chartBoxPos}}
            tokensArrayObj={tokensArrayObj}
          />
        </group>
      </>}
      <group position={[0,-1,0]}>

{/* <DynaText text={"n"}  color={0x000}
  position={new Vector3(0,0,-2.5)}
   font={0.6} 
/> */}
</group>
    <group position={[0,-1,0]} rotation={[0,Math.PI,0]}>

      <DynaText text={"s"}  color={0x000}
        position={new Vector3(0,0,-2.5)}
         font={0.6} 
      />
    </group>

        <BitcoinTradingBox tokensArrayObj={tokensArrayObj} selectedToken={selectedToken}
          toggleTrade={toggleTrade}
          hasAnyToken={hasAnyToken} $bitcoin={$bitcoin}
          form={form} timeframe={form.id.split("USDT")[1]} token="btc" 
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
      {/* <group position={btcBoxPos} rotation={[0,0,0]} ref={$bitcoin}>
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
    </group> */}
    {hasAnyToken &&
      <group position={[-0.3,-0.1,0.5]}>
        <group position={[1,0,-1]} rotation={[0,0,0]}>
        {("eth" in tokensArrayObj || "btc" in tokensArrayObj) && <>
          <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth"
            tokensArrayArray={"eth" in tokensArrayObj ? tokensArrayObj["eth"] : null}
            refetchInterval={selectedToken == "eth" ? 4000 : 60000}
             unselectedColor={"#50545B"}
            onTextClick={()=>{onTextClick("eth")}} 
            setVelocityY={(data:any)=>{toggleTrade("eth",data)}}
            turnOn={()=>{turnOn("eth")}} turnOff={()=>{turnOff("eth")}}
            join={()=>{join("eth")}} leave={()=>{leave("eth")}}
            trendDown={()=>{trendDown("eth")}} trendUp={()=>{trendUp("eth")}} 
            onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("eth",tf)}}
          /> 
        </>}
        </group>
        {/* PIPE 1 */}
        {"btc" in tokensArrayObj && <> <MovingBox1 /> </>}
        <Box args={[0.03,0.05,0.06]} position={[0.19,-0.4,-1]} castShadow receiveShadow>
          <meshStandardMaterial color={"#333"}/>
        </Box>
        {/* PIPE 2 */}
        {"link" in tokensArrayObj && <>
          <Box args={[0.1,0.1,0.5]} position={[-0.2,-0.45,-0.3]} castShadow receiveShadow>
            <meshStandardMaterial color={"#888"}/>
          </Box>
          <Box args={[0.02,0.02,0.5]} position={[-0.2,-0.37,-0.3]} castShadow receiveShadow>
            <meshStandardMaterial color={"#777"}/>
          </Box>
        </>}
        {/* PIPE 3 */}
        {"ftm" in tokensArrayObj && <> <MovingBox2 /> </>}
        {("eth" in tokensArrayObj || "link" in tokensArrayObj) &&
          <group position={[-0.3,0,0.3]} >
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link"
              tokensArrayArray={"link" in tokensArrayObj ? tokensArrayObj["link"] : null}
              refetchInterval={selectedToken == "link" ? 4000 : 60000}
              position={[0,0,0]} unselectedColor={"#50545B"}
              onTextClick={()=>{onTextClick("link")}} 
              setVelocityY={(data:any)=>{toggleTrade("link",data)}}
              turnOn={()=>{turnOn("link")}} turnOff={()=>{turnOff("link")}}
              join={()=>{join("link")}} leave={()=>{leave("link")}}
              trendDown={()=>{trendDown("link")}} trendUp={()=>{trendUp("link")}} 
              onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("link",tf)}}
            /> 
          </group>
        }
        {("eth" in tokensArrayObj || "ftm" in tokensArrayObj) &&
          <group position={[1,0,0.3]}  >
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm"
              tokensArrayArray={"ftm" in tokensArrayObj ? tokensArrayObj["ftm"] : null}
              refetchInterval={selectedToken == "ftm" ? 4000 : 60000}
              position={[0,0,0]} unselectedColor={"#50545B"}
              onTextClick={()=>{onTextClick("ftm")}} 
              setVelocityY={(data:any)=>{toggleTrade("ftm",data)}}
              turnOn={()=>{turnOn("ftm")}} turnOff={()=>{turnOff("ftm")}}
              join={()=>{join("ftm")}} leave={()=>{leave("ftm")}}
              trendDown={()=>{trendDown("ftm")}} trendUp={()=>{trendUp("ftm")}} 
              onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("ftm",tf)}}
            /> 
        </group>}
      </group>}
    </Scene>
  </>)
}

export default Component