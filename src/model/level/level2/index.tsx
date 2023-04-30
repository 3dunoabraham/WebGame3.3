"use client";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, OrbitControls } from "@react-three/drei";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";


import { getComputedLevels } from "@/../script/util/helper/decoy";
import Scene from "@/model/core/Scene"
import TradingBox, { DEFAULT_TIMEFRAME_ARRAY } from "@/model/npc/TradingBox";
import ChartBox from "@/model/npc/ChartBox";
import MovingBox1 from "./MovingBox1";
import MovingBox2 from "./MovingBox2";
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import { fetchPost } from "@/../script/util/helper/fetchHelper";
import BitcoinTradingBox from "./BitcoinTradingBox";
import { AppContext } from "@/../script/state/context/AppContext";
import TutorialContainer from "./TutorialContainer";
import LoginForm from "./LoginForm";
import GoalPost from "./GoalPost";

const DEFAULT_TOKEN_OBJ = {
  mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
  min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
}
const selectedTimeframeIndex = 0
const selectedTimeframe = "3m"
const feePercent = 0.0
const chartPosLookup:any = {
  "btc": [-1.1,0,-0.45], "eth": [0.2,0,-0.45], "link": [-1.1,0,0.85], "ftm": [0.2,0,0.85],
}
const chartRotLookup:any = {
  "btc": [0,Math.PI/2,0], "eth": [0,Math.PI/2,0], "link": [0,Math.PI/2,0], "ftm": [0,Math.PI/2,0],
}

function Component ({}) {
  const app:any = useContext(AppContext)
  const $bitcoin:any = useRef()
  const [chartPos, s__chartPos]:any = useState(chartPosLookup["btc"])
  const [chartRot, s__chartRot]:any = useState(chartRotLookup["btc"])
  const [LS_binanceKeys, s__LS_binanceKeys] = useLocalStorage('binanceKeys', "user:0000")
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
  const [chartBoxPos, s__chartBoxPos] = useState([0,0,0])
  const [enablePan, s__enablePan] = useState(true)
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [selectedToken, __selectedToken] = useState("btc")
  const [currentOrders, s__currentOrders] = useState<any>({})
  const [orderHistory, s__orderHistory] = useState<any>([])
  const [profitHistory, s__profitHistory] = useState<any>([])
  const [binanceKeys, s__binanceKeys] = useState<any>(LS_binanceKeys)
  const [form,s__form] = useState({
    id:"BTCUSDT3M",
  })
  const AI_BASE = `
    analyze this data and make a report:
    include trend direction, resistance and support levels.
    each array of the json represents the latest candlestick chart data with only the closing price
    generate the report including all 4 timeframes  \n\n candles data:
  `
  const [AIdata, s__AIdata] = useState({})
  const tutoStage:any = useMemo(()=> JSON.parse(_tutoStage) , [_tutoStage])
  const hasAnyToken = useMemo(()=>{
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
      return token in tokensArrayObj
    })
    return interestCount.length > 0
  },[tokensArrayObj])
  const hasAllTokens = useMemo(()=>{
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
      return token in tokensArrayObj
    })
    return interestCount.length == 4
  },[tokensArrayObj])



  const onTimeframeClick = (x:any, y:any) => {  }
  const join = (x:any) => {
      s__selectedToken(x)
      updateTokenOrder(x,selectedTimeframeIndex,"state",0)
  }
  const leave = (x:any) => {
      s__selectedToken(x)
      let new_tokensArrayObj = {...tokensArrayObj};
      delete new_tokensArrayObj[x];
      s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj));
      s__tokensArrayObj(new_tokensArrayObj)
  }
  const trendDown = (x:any) => { 
    s__selectedToken(x)
    updateTokenOrder(x,selectedTimeframeIndex,"mode",1)
  }
  const trendUp = (x:any) => { 
    s__selectedToken(x)
    updateTokenOrder(x,selectedTimeframeIndex,"mode",0)
   }
  const turnOn = (x:any) => { 
    s__selectedToken(x)

    if (!tutoStage.lvl) { setTutoStage(1) }
    updateTokenOrder(x,selectedTimeframeIndex,"state",1)
  }
  const turnOff = (x:any) => {
    updateTokenOrder(x,selectedTimeframeIndex,"state",0)
  }
  const s__selectedToken = (val:any) => {
    let newId = val.toUpperCase() + "USDT" + selectedTimeframe.toUpperCase()
    s__form({id:newId})
    __selectedToken(val)
    s__chartPos(chartPosLookup[val])
    s__chartRot(chartRotLookup[val])
  }
  const toggleTrade = async (x:any, y:any) => {
    if (tutoStage.lvl == 1) { setTutoStage(2) }
    if (tutoStage.lvl == 2) {
      if (isDefaultUser) { setTutoStage(3) }
      else { setTutoStage(4) }
    }

    let newTradeObj = {side:!!y.value ? "buy" : "sell",token:x,price:y.price}
    let isBuying = newTradeObj.side == "buy"
    s__orderHistory([...orderHistory, newTradeObj])
    updateTokenOrder(x,selectedTimeframeIndex,"buy",isBuying ? "1" : "0",{["price"]:y.price})
    if (form.id in currentOrders)
    {
      let oldOrders = {...currentOrders}
      if (newTradeObj.side == "sell") {
        let theindex = profitHistory.length
        let newprofithi:any = [...profitHistory, [oldOrders[form.id],newTradeObj]]
        let percentChange:any = newprofithi.price == oldOrders[form.id].price ? 0 : (
          parseFloat(`${newTradeObj.price/oldOrders[form.id].price*100}`).toFixed(2)
        )
        
        newprofithi[theindex].unshift((percentChange-100) > feePercent ? "profit" : "loss")
        newprofithi[theindex].unshift((percentChange-100).toFixed(3))
        s__profitHistory(newprofithi)
        let counting = newprofithi.filter((atrade:any, index:any) => {
          // console.log("atrade[1]", atrade[1])
          return atrade[1] == "profit"
        }).length
        if (counting >= 4) {
          setTutoStage(5)
        }
      }
      delete oldOrders[form.id]
      s__currentOrders(oldOrders)
    } else {
      if (newTradeObj.side == "buy") {
          s__currentOrders({...currentOrders, [form.id]: newTradeObj })
        } 
    }
    let keyval = binanceKeys
    
    const splitKey = keyval.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") {
      return
    }
    let fetchObjData = {
      side: newTradeObj.side,
      symbol: x.toUpperCase()+"USDT",
      quantity:30,
      price:newTradeObj.side == "buy" ? newTradeObj.price : newTradeObj.price,
      apiKey: keyval.split(":")[0],
      apiSecret: keyval.split(":")[1]
    }

    // app.alert("neutral", "Saving Order")
    let fetchRes:any = await fetchPost("/api/order/place",fetchObjData)
    if (fetchRes.status >= 400) {
      app.alert("error","Failed to save order")
      return
    }
    app.alert("success", "Order saved")
  }
  const onTextClick = (x:any) => { 
    s__selectedToken(x)
  }
  const updateTokenOrder = async (_token:string, timeframe:any, substate:string,val:any="",subobj:any=null) => {
    if (!_token) return
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
    let newCrystal = {
      ...old_tokensArrayObjArray[timeframeIndex],
      ...{[substate]:value,...(subobj || {})},
      ...getComputedLevels({
        ...old_tokensArrayObjArray[timeframeIndex],
        ...{[substate]:value},
        ...(subobj || {})
      }),
    }
    old_tokensArrayObjArray[timeframeIndex] = {...old_tokensArrayObj,...newCrystal}
    let bigTokensObj = {...tokensArrayObj, ...{[_token]:old_tokensArrayObjArray}}
    s__tokensArrayObj(bigTokensObj)
    s__LS_tokensArrayObj((prevValue) => JSON.stringify(bigTokensObj))
  }
  const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
  const askAI = (data:any) => {
    let verbose:any = {
      "3m": "3 minutes between prices",
      "15m": "15 minutes between prices",
      "4h": "4 hours between prices",
      "1d": "1 day between prices",
    }
    let newPrompt:any = AIdata
    newPrompt[verbose[selectedTimeframe.toLowerCase()]] = ([...data]).splice(400,499)
    s__AIdata(newPrompt)
    console.log("newPrompt", newPrompt)
    clipbloard__do(AI_BASE + JSON.stringify(newPrompt))
  }
  const setTutoStage = (lvl:any) => {

    s__LS_tutoStage(JSON.stringify({...tutoStage,lvl}))
  }
  const turnOffDemo = () => {
    turnOn("btc")
    setTutoStage(1)
  }
  const triggerLogout = () => {
    if (prompt("Sign out from: <"+binanceKeys+"> (yes/no)","yes") !== "yes") return
    
    quitAll()
  }
  const triggerLogin = () => {
    if (tutoStage.lvl == 3) { firstLogin(); return }
    let keyval:any =  prompt("Paste your credentials","") 
    if (!keyval) return
    if (keyval.split(":").length < 2) return
    s__binanceKeys(keyval)
    s__LS_binanceKeys(keyval)

  }
  const firstLogin = () => {
    setTutoStage(4)
    let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
    let arandomkey = "user:"+randomThousand
    // if (!isDefaultUser) {
    //   if (prompt("Change user? (yes/no)","no") != "yes") { return }
    // }
    let keyval:any =  prompt("Copy or Paste your secret credentials | user:"+randomThousand,arandomkey) 
    if (!keyval) return
    if (keyval.split(":").length < 2) return
    s__binanceKeys(keyval)
    s__LS_binanceKeys(keyval)
  }
  const isDefaultUser = useMemo(()=>{
    const splitKey = binanceKeys.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
    return false
  },[binanceKeys])
  const quitAll = () => {
    s__LS_binanceKeys("user:0000");
    s__LS_tutoStage("{}");
    s__LS_tokensArrayObj("{}");
    window.location.reload()
  }
  const claim = () => {
    if (realProfitCount < 4) { return }
    app.alert("success", "Please contact support with your ID")
    prompt("Please contact support with your ID",binanceKeys)
  }

  const realProfitCount = useMemo(()=>{
    return profitHistory.filter((atrade:any, index:any) => {
      // console.log("atrade[1]", atrade[1])
      return atrade[1] == "profit"
    }).length
  },[profitHistory])

  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
  },[])

  

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
      {/* {hasAnyToken && <>
        <Cylinder args={[0.1,0.1,0.2,6]} position={[0,!enablePan?-1:-0.95,0]} castShadow receiveShadow 
          onClick={()=>{s__enablePan(!enablePan)}}
        >
          <meshStandardMaterial color={!enablePan ? "#f99" : "#999"}/>
        </Cylinder>
        
        <DynaText
          text={"Lock Camera"}
          color={!enablePan ? "#a55" : "#977"}
          font={0.06}
          position={[0,-0.94,-0.17]} 
          
        >        
      </DynaText>
      </>} */}

      <ambientLight intensity={0.25} />
      <pointLight intensity={1.5} position={[1.5, 1, 3]} castShadow />


  
      <TutorialContainer  calls={{join,turnOffDemo,setTutoStage,firstLogin}} 
        state={{hasAnyToken, tutoStage}}
      />

      <LoginForm state={{isDefaultUser, }} calls={{triggerLogout, triggerLogin}} />
      
      <GoalPost calls={{claim}}
        state={{hasAnyToken, profitHistory}}
      />

      {hasAnyToken && <>
        <group scale={[0.4,0.4,0.4]}  position={chartPos} rotation={chartRot}>
          <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={selectedTimeframe.toLowerCase() || "1d"}
            position={[0,0,0]} velocityX={0}  theToken={form.id.split("USDT")[0]} askAI={(data:any)=>{askAI(data)}}
            velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos, s__chartBoxPos}}
            tokensArrayObj={tokensArrayObj}
          />
        </group>
      </>}

      <BitcoinTradingBox tokensArrayObj={tokensArrayObj} selectedToken={selectedToken}
        toggleTrade={(tokenname:any,data:any)=>{toggleTrade("btc",data)}}
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
          </group>
        }
      </group>}
      
      {hasAllTokens && <>
        <Box args={[4,0.25,5]} position={[0,-1.2,-0.5]} castShadow receiveShadow>
          <meshStandardMaterial color={ "#fff"}/>
        </Box>
      </>}
      <Box args={[2.5,0.2,2.5]} position={[0.05,-1.05,0.15]} castShadow receiveShadow>
        <meshStandardMaterial color={"#fff"}/>
      </Box>

    </Scene>
  </>)
}

export default Component