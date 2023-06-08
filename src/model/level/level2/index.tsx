"use client";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Bounds, Box, OrbitControls } from "@react-three/drei";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";


import { getComputedLevels } from "@/../script/util/helper/decoy";
import Scene from "@/model/core/Scene"
import TradingBox, { DEFAULT_TIMEFRAME_ARRAY } from "@/model/npc/TradingBox";
import ChartBox from "@/model/npc/ChartBox";
import Level1_Index1  from "./index1";
import MovingBox1 from "./npc/MovingBox1";
import MovingBox2 from "./npc/MovingBox2";
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import { fetchPost } from "@/../script/util/helper/fetchHelper";
import ByteCityLibertyBank from "./npc/ByteCityLibertyBank";
import { AppContext } from "@/../script/state/context/AppContext";
import TutorialContainer from "./tutorial/TutorialContainer";
import ConnectPlayerButton from "./core/ConnectPlayerButton";
import GoalPost from "./goal/GoalPost";
import SavedGoalPost from "./goal/SavedGoalPost";
import { useAuth } from "@/../script/state/context/AuthContext";
import RoadJack from "./core/RoadJack";
import MovingCar from "./npc/MovingCar";
import ByteCityEnv from "./core/ByteCityEnv";
import RoadJack2 from "./core/RoadJack2";
import GoodPlaceGoal from "./goal/GoodPlaceGoal";
import { useUnloadHandler } from "../../../../script/util/hook/useHooksHelper";
import { useRouter } from "next/navigation";

const DEFAULT_TOKEN_OBJ = {
  mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
  min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
}
const selectedTimeframeIndex = 0
const selectedTimeframe = "3m"
const feePercent = 0.0
const chartPosLookup:any = {
  "btc": [-1.115,0,-0.63], "eth": [1.22,0,-0.02], "link": [-1.11,0,1.15], "ftm": [0.72,0,1.515],
}
const chartRotLookup:any = {
  "btc": [0,Math.PI/2,0], "eth": [0,-Math.PI/2,0], "link": [0,Math.PI/2,0], "ftm": [0,0,0],
}

function Component ({}) {
  const app:any = useContext(AppContext)
  const { user, superuser, do:{login, logout, fetchSuperuser, demo,},  jwt }:any = useAuth()
  

  
  const [chartPos, s__chartPos]:any = useState(chartPosLookup["btc"])
  const [chartRot, s__chartRot]:any = useState(chartRotLookup["btc"])
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
  const [chartBoxPos, s__chartBoxPos] = useState([0,0,0])
  const [enablePan, s__enablePan] = useState(true)
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [savedString,s__savedString] = useState("")
  const [selectedToken, __selectedToken] = useState("btc")
  const [currentOrders, s__currentOrders] = useState<any>({})
  const [orderHistory, s__orderHistory] = useState<any>([])
  const [profitHistory, s__profitHistory] = useState<any>([])
  const [rpi, s__rpi] = useState<any>(LS_rpi)
  const [form,s__form] = useState({
    id:"BTCUSDT3M",
  })
  const AI_BASE = `
    analyze this data and make a report:
    include trend direction, resistance and support levels.
    each array of the json represents the latest candlestick chart data with only the closing price
    generate the report including all 4 timeframes  \n\n candles data:
  `
  const [projectionMode, s__projectionMode] = useState(false)
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
  const [LH_superuser, s__LH_superuser]:any = useLocalStorage("superuser","{}")
  // const [live_superuser, s__live_superuser] = useState()
  const [notSaved,s__notSaved] = useState(false)

  const router = useRouter()

  useUnloadHandler(router, notSaved,)


  const onTimeframeClick = (x:any, y:any) => {  }
  const join = (x:any) => {
      s__selectedToken(x)
      updateTokenOrder(x,selectedTimeframeIndex,"state",0)
  }
  const leave = async (x:any) => {
      

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
    // console.log()
    s__chartPos(chartPosLookup[val])
    s__chartRot(chartRotLookup[val])
  }
  const toggleTrade = async (x:any, y:any) => {
    if (profitHistory.length > 4) {
      alert("Simulation Bankrunptcy Error!")
      return
    }


    let newTradeObj = {side:!!y.value ? "buy" : "sell",token:x,price:y.price}
    let isBuying = newTradeObj.side == "buy"
    if (tutoStage.lvl == 1) {
      if ( isBuying) { setTutoStage(2) }
    }
    if (tutoStage.lvl == 2) {
      if ( !isBuying) { setTutoStage(3) }
    }
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
        
        if (!!projectionMode) {
          projectVirtualOrder(form.id, newTradeObj)
          app.alert("success", "Sending SELL order with synced api keys")
        }

        let counting = newprofithi.filter((atrade:any, index:any) => {
          return atrade[1] == "profit"
        }).length
        if (counting >= 4) {
          setTutoStage(5)
        }
      }
      delete oldOrders[form.id]
      s__currentOrders(oldOrders)
      s__notSaved(false)
      } else {
      if (newTradeObj.side == "buy") {
        s__currentOrders({...currentOrders, [form.id]: newTradeObj })
        s__notSaved(true)
        if (!!projectionMode) {
          projectVirtualOrder(form.id, newTradeObj)
          app.alert("success", "Sending BUY order with synced api keys")
        }
      } 
      if (newTradeObj.side == "sell") {
        s__orderHistory(orderHistory)
        if (tutoStage > 4)
        app.alert("error","Missing live buy order")
      } 
    }
    let keyval = rpi
    
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
    // let fetchRes:any = await fetchPost("/api/order/place",fetchObjData)
    // if (fetchRes.status >= 400) {
    //   app.alert("error","Failed to save order")
    //   return
    // }
    // app.alert("success", "Order saved")
    // if (orderHistory.length >= 9) {
    //   alert("Simulation Bankrunptcy!")
    //   return
    // }
  }
  const projectVirtualOrder = async (theid:any, thetrade:any) => {
    console.log("theid, thetrade")
    console.log(theid, thetrade)



    
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        apiKey: splitKey[0],
        apiSecret: splitKey[1],
        ...thetrade,
        // price: `${thetrade}`,
        quantity: 39,
        symbol: thetrade.token.toUpperCase()+"USDT",
      }
    app.alert("neutral", "Saving Order")
    let fetchRes:any = await fetchPost("/api/order/place",thedata)
    if (fetchRes.status >= 400) {
      app.alert("error","Failed to save order")
      return
    }
    // app.alert("success", "Order saved")
    // if (orderHistory.length >= 9) {
    //   alert("Simulation Bankrunptcy!")
    //   return
    // }
      app.alert("success", "Successfully projected order to synced API!")

      fetchSuperuser()
    } catch (e:unknown) {
      app.alert("error", "Failed order projection!")
    }
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
    if (prompt("Sign out from: <"+rpi.split(":")[0]+":****> (yes/no)","yes") !== "yes") return
    
    quitAll()
  }
  const triggerResetAll = () => {
    if (prompt("Reset local storage (yes/no)","yes") !== "yes") return

    
    s__LS_rpi("user:0000");
    s__LS_tutoStage("{}");
    s__LS_tokensArrayObj("{}");
    window.location.reload()
  }
  const triggerLogin = async () => {
    
    let keyval:any =  prompt("Enter your Byte City Credentials! \n\n < Referral Email : Secret PIN >","") 
    if (!keyval) return
    if (keyval.split(":").length < 2) return
    app.alert("success", "Validating credentials...")
    try {
      let playerCredentials = {        
        referral:keyval.split(":")[0],
        pin:keyval.split(":")[1]
      }
      let loginRes = await login(playerCredentials)
      if (!loginRes) return 
      app.alert("success", "Account connected")   

      s__rpi(keyval)
      s__LS_rpi(keyval)

      const founduserRes = await fetch("/api/player/verify",{
        method: "POST",
        body: JSON.stringify({
          referral:keyval.split(":")[0],
          pin:keyval.split(":")[1]
        })
      })
      if (founduserRes.status >= 400) throw new Error()
      let theplayer = await founduserRes.json()
      if (!theplayer) return window.location.reload()

      if (theplayer.goodAttempts > 0) {
        setTutoStage(4)
      }
      window.location.reload()
    } catch (e:any) {
      app.alert("error", "Failed sync")   
    }
  }
  const firstLogin = async () => {
    let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
    let arandomkey = "user:"+randomThousand
    
    let keyval:any =  prompt("1 ENTER USER:PASSWORD",arandomkey) 
    if (!keyval) return
    if (keyval.split(":").length < 2) return

    try {

      const founduserRes = await fetch("/api/player/verify",{
        method: "POST",
        body: JSON.stringify({
          apiKey:keyval.split(":")[0],
          apiSecret:keyval.split(":")[1]
        })
      })
      if (founduserRes.status >= 400) throw new Error()
      app.alert("success", "Account connected")   
  
      s__rpi(keyval)
      s__LS_rpi(keyval)
  
    } catch (e:any) {
      app.alert("error", "Failed sync")   
    }
  }
  const isDefaultUser = useMemo(()=>{
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
    return false
  },[rpi])
  const quitAll = async () => {

    s__LS_rpi("user:0000");
    s__LS_tutoStage("{}");
    s__LS_tokensArrayObj("{}");

    await logout()
    window.location.reload()
  }
  const claimOrSyncDatabase = async () => {
    if (isDefaultUser) return
  }

  const claimOrSync = async () => {
    if (isDefaultUser) {
      if (profitHistory.length  == 0) {
        app.alert("neutral", "Tip: Buy low and sell high to get points!")
        return
      } else {
        if (realProfitCount == 0) {
          app.alert("neutral", "Tip: Remove bad orders (losses) by fixing (click) white-roofed cars!")
        } else {
          app.alert("neutral", "Tip: Buy and sell profitably 4 times to level up!")
        }

      }
    } else {
      if (realProfitCount < 4) {
        app.alert("neutral", "Trying to sync account")
        let loginRes = await login({
          referral:LS_rpi.split(":")[0],
          pin:LS_rpi.split(":")[1]
        })
        if (!loginRes) return 

      } else {
        s__profitHistory([])

        app.alert("success", "Congratulations! you've reached the simulated!")
      }
    }

    if (tutoStage == 3) {
      setTutoStage(4)
    }
  }

  const isSelectedTokenDowntrend = useMemo(()=>{
    let tokensArrayArray = tokensArrayObj[selectedToken]
    return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].mode
  },[tokensArrayObj, selectedToken,selectedTimeframeIndex])



  const realProfitCount = useMemo(()=>{
    return profitHistory.filter((atrade:any, index:any) => {
      return !!atrade[1] && atrade[1] == "profit"
    }).length
  },[profitHistory])

  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    s__savedString(LH_superuser)
  },[user, superuser])

  const onFirstCarClicked = (e:any) => {
    console.log("asd", e)
    if (e > 3) {
      if (profitHistory.length > 0) {
        if (realProfitCount == profitHistory.length) {
          app.alert("error", "No losses found, bad karma!")
        } else {
          app.alert("success", "Successfully reduced debt, You claimed a job!")
        }
      } else {
        app.alert("error", "No orders found, bad reputation!")
      }
      
      let theIndex = -1
      for (let index = 0; index < profitHistory.length; index++) {
        const element = profitHistory[index];
        if (element[1] == "loss"){
          theIndex = index
        }
      }
      if (theIndex == -1)  return

      let aNewArray = [...profitHistory]
      aNewArray.splice(theIndex, 1)
      s__profitHistory(aNewArray)
    }
  }
  const _s__projectionMode = (val:boolean) => {
    s__projectionMode(val)
  }
  const setAPIKeys = async() => {
    

    let binanceapikeys:any =  prompt("Enter your API Keys! \n\n < Public : Secret >","") 
    if (!binanceapikeys) return
    if (binanceapikeys.split(":").length < 2) return
    
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        apiKey: splitKey[0],
        apiSecret: splitKey[1],
        binancePublic: binanceapikeys.split(":")[0],
        binanceSecret: binanceapikeys.split(":")[1],
    
        
      }
    app.alert("neutral", "Setting api keys")
    let fetchRes:any = await fetchPost("/api/player/apikeys",thedata)
    if (fetchRes.status >= 400) {
      app.alert("error","Failed to Set api keys")
      return
    }
      app.alert("success", "Successfully set API keys!")

      fetchSuperuser()
    } catch (e:unknown) {
      app.alert("error", "Failed api setting!")
    }
  }
  const triggerSyncGoodPlace = async () => {
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        apiKey: splitKey[0],
        apiSecret: splitKey[1],
      }
    app.alert("neutral", "Syncing Good Trades...")
    let fetchRes:any = await fetchPost("/api/order/sync",thedata)
    if (fetchRes.status >= 400) {
      app.alert("error","Failed to Syncing Good Trades")
      return
    }
      app.alert("success", "Successfully Syncing Good Trades!")
      window.location.reload()
    } catch (e:unknown) {
      app.alert("error", "Failed good order Syncing !")
    }
  }

  return (<>
    <Scene>
      {/* SCENE ENVIRONMENT */}
      <MetaOrbitControls/>
      <ByteCityEnv />
      <TutorialContainer  calls={{join,turnOffDemo,setTutoStage,firstLogin}} 
        state={{hasAnyToken, tutoStage, isDefaultUser}}
      />
      <ConnectPlayerButton state={{isDefaultUser, }} calls={{triggerLogout, triggerResetAll, triggerLogin}} />
      <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow>
        <meshStandardMaterial color={"#fff"}/>
      </Box>

      <Level1_Index1 {...{
          state:{tokensArrayObj, selectedToken, hasAnyToken, form, isDefaultUser, chartPos, chartRot, 
            isSelectedTokenDowntrend, selectedTimeframe, chartBoxPos, 
          },
          calls:{toggleTrade, onTextClick, turnOn, trendUp, leave, turnOff, onTimeframeClick,
            trendDown, join, askAI, s__chartBoxPos, 
          }
      }}/>

      






      {/* CHAPTER 1 */}
      {/* BTC | Bitcoin | Bit Coin */}
      {/* CHAPTER 1 */}
      {/* <ByteCityLibertyBank tokensArrayObj={tokensArrayObj} selectedToken={selectedToken}
        toggleTrade={(tokenname:any,data:any)=>{toggleTrade("btc",data)}}
        hasAnyToken={hasAnyToken} 
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
      /> */}
      {/* CHAPTER X */}
      {/* {hasAnyToken && !isDefaultUser && !!tokensArrayObj[selectedToken] && isSelectedTokenDowntrend && <>
        <group scale={[0.4,0.4,0.4]}  position={chartPos} rotation={chartRot}>
          <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={selectedTimeframe.toLowerCase() || "1d"}
            position={[0,0,0]} velocityX={0}  theToken={form.id.split("USDT")[0]} askAI={(data:any)=>{askAI(data)}}
            velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos, s__chartBoxPos}}
            tokensArrayObj={tokensArrayObj}
          />
        </group>
      </>}
 */}



      {/* CHAPTER 2 */}
      {/* ETH | Ethereum | Ethirium */}
      {/* CHAPTER 2 */}
      {hasAnyToken &&  tutoStage.lvl >= 3 &&
        <group position={[0,0.3,0]}> 
          <GoalPost calls={{claim:claimOrSync}}
            state={{hasAnyToken, profitHistory}}
          />
        </group>
      }
      {/* MAIN ROAD 1 */}
      {"btc" in tokensArrayObj && <> 
        <RoadJack />
        <MovingCar calls={{onClicked:onFirstCarClicked}} />
        <group rotation={[0,Math.PI,0]} scale={[1,1,0.7]} position={[1,0,-0.3]}>
          <MovingBox1 />
        </group>
      </>}
      {hasAnyToken && // ETH | Ethereum | Ethirium
        <group position={[-0.3,-0.1,0.5]}>
          <group position={[1,0,-1]} rotation={[0,0,0]}>
            {!isDefaultUser && ("eth" in tokensArrayObj || ("btc" in tokensArrayObj)) &&
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth"
              mainModel="tower"
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
            }
          </group>
        </group>
      }







      {/* CHAPTER 3 */}
      {/* LINK | Chain Link | chainlink */}
      {/* CHAPTER 3 */}
      {hasAnyToken &&  (tutoStage.lvl > 3 && !!superuser) && !isDefaultUser &&
        <group position={[0,0,1.6]}>
          <SavedGoalPost calls={{triggerSyncGoodPlace,setAPIKeys, claim:claimOrSyncDatabase}}
            {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString }}
          />
        </group>
      }
      {hasAnyToken && // LINK | Chain Link | chainlink
        <group position={[-0.3,-0.1,0.5]}>
          {("eth" in tokensArrayObj || "link" in tokensArrayObj) && tutoStage.lvl >= 3 &&
            <group position={[-0.3,0,0.58]} >
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
        </group>
      }
      {/* PIPE 2 */}
      {("link" in tokensArrayObj || (hasAnyToken &&
       (tutoStage.lvl > 3 && !!superuser) && !isDefaultUser))&&
        <>
          <RoadJack2 />
        </>
      }
      






      {/* CHAPTER 4 */}
      {/* FTM | Fantom | Phantom */}
      {/* CHAPTER 4 */}
      
      {hasAnyToken &&  (tutoStage.lvl > 3 && !!superuser && superuser.goodAttempts > 0) && !isDefaultUser &&
        <group position={[0,0,6]}>
          <GoodPlaceGoal calls={{triggerSyncGoodPlace,setAPIKeys, claim:claimOrSyncDatabase}} {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString }}
          />
        </group>
      }
    {hasAnyToken &&
        <group position={[-0.3, -0.1, 0.5]}>


          {("eth" in tokensArrayObj || "ftm" in tokensArrayObj) && !isDefaultUser && tutoStage.lvl > 3 &&
            <group position={[1, 0, 0.58]} rotation={[0, Math.PI / 2, 0]}>
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm"
                tokensArrayArray={"ftm" in tokensArrayObj ? tokensArrayObj["ftm"] : null}
                refetchInterval={selectedToken == "ftm" ? 4000 : 60000}
                position={[0, 0, 0]} unselectedColor={"#50545B"}
                onTextClick={() => { onTextClick("ftm") }}
                setVelocityY={(data: any) => { toggleTrade("ftm", data) }}
                turnOn={() => { turnOn("ftm") }} turnOff={() => { turnOff("ftm") }}
                join={() => { join("ftm") }} leave={() => { leave("ftm") }}
                trendDown={() => { trendDown("ftm") }} trendUp={() => { trendUp("ftm") }}
                onTimeframeClick={(token: any, tf: any) => { onTimeframeClick("ftm", tf) }}
              />
            </group>
          }
        </group>
      }
      {/* PIPE 3 */}
      {"ftm" in tokensArrayObj && <> <MovingBox2 /> </>}
      {hasAllTokens && <>
        <Box args={[4, 0.25, 5]} position={[0, -1.2, -0.5]} castShadow receiveShadow>
          <meshStandardMaterial color={"#fff"} />
        </Box>
      </>}
      {hasAnyToken && tutoStage.lvl >= 3 && <>
        <Box args={[1, 0.8, 1.1]} position={[0.05, -0.81, -1.59]} castShadow receiveShadow>
          <meshStandardMaterial color={"#eee"} />
        </Box>
      </>}
    </Scene>
  </>)
}

export default Component