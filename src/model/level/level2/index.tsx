"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Box } from "@react-three/drei";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";


import { getComputedLevels } from "@/../script/util/helper/decoy";
import Scene from "@/model/core/Scene"
import TradingBox, { DEFAULT_TIMEFRAME_ARRAY } from "@/model/npc/TradingBox";
import Level1_Index1  from "./index1";
import MovingStaticCar from "./npc/MovingStaticCar";
import MovingBoxAndPipe from "./npc/MovingBoxAndPipe";
import { fetchPost } from "@/../script/util/helper/fetchHelper";
import { AppContext } from "@/../script/state/context/AppContext";
import TutorialContainer from "./tutorial/TutorialContainer";
import GoalPost from "./goal/GoalPost";
import SavedGoalPost from "./goal/SavedGoalPost";
import { useAuth } from "@/../script/state/context/AuthContext";
import MainRoadEastWest from "./core/MainRoadEastWest";
import MovingScoreCar from "./npc/MovingScoreCar";
import RoadNorthSouth from "./core/RoadNorthSouth";
import GoodPlaceGoal from "./goal/GoodPlaceGoal";
import { useUnloadHandler } from "../../../../script/util/hook/useHooksHelper";
import { useRouter } from "next/navigation";
import { countProfitableTrades, createTradeObject, handleFirstTutorialStages, handleSellSide, updateProfitHistory } from "./core";
import Level1_Index2 from "./index2";

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
  const [projectionMode, s__projectionMode] = useState(false)
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














  const setTutoStage = (lvl:any) => {

    s__LS_tutoStage(JSON.stringify({...tutoStage,lvl}))
  }
  const onTimeframeClick = (x:any, y:any) => {  }
  const join = (x:any) => {
      s__selectedToken(x)
      updateTokenOrder(x,selectedTimeframeIndex,"state",0)
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
      return alert("Simulation Bankruptcy Error!");
    }
  
    const newTradeObj:any = createTradeObject(x, y);
    const isBuying = newTradeObj.side === "buy";
  
    handleFirstTutorialStages(isBuying, tutoStage, setTutoStage);
    s__orderHistory([...orderHistory, newTradeObj])
    updateTokenOrder(x,selectedTimeframeIndex,"buy",isBuying ? "1" : "0",{["price"]:y.price})
  
    if (form.id in currentOrders) {
      handleExistingOrder(newTradeObj);
    } else {
      handleNewOrder(newTradeObj);
    }
  };
  
  
  const handleExistingOrder = (newTradeObj:any): void => {
    let oldOrders = { ...currentOrders };
  
    if (newTradeObj.side === "sell") {
      let newprofithi = updateProfitHistory(currentOrders, form, newTradeObj, profitHistory, feePercent);
      s__profitHistory(newprofithi);
  
      let counting = countProfitableTrades(newprofithi);
      if (counting >= 4) {
        setTutoStage(5);
      }
  
      handleSellSide(newTradeObj, form, projectionMode, app, s__profitHistory, projectVirtualOrder);
    }
  
    delete oldOrders[form.id];
    s__currentOrders(oldOrders);
    s__notSaved(false);
  };
    
  
  const handleNewOrder = (newTradeObj:any) => {
    if (newTradeObj.side === "buy") {
      s__currentOrders({ ...currentOrders, [form.id]: newTradeObj });
      s__notSaved(true);
  
      if (!!projectionMode) {
        projectVirtualOrder(form.id, newTradeObj);
        app.alert("success", "Sending BUY order with synced API keys");
      }
    } else if (newTradeObj.side === "sell") {
      app.alert("error", "Missing live buy order");
      // s__orderHistory(orderHistory);
      // if (tutoStage > 4)
    }
  };
  














  const projectVirtualOrder = async (theid:any, thetrade:any) => {    
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        apiKey: splitKey[0],
        apiSecret: splitKey[1],
        ...thetrade,
        quantity: 39,
        symbol: thetrade.token.toUpperCase()+"USDT",
      }
      app.alert("neutral", "Saving Order")
      let fetchRes:any = await fetchPost("/api/order/place",thedata)
      if (fetchRes.status >= 400) {
        app.alert("error","Failed to save order")
        return
      }
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


































  const isDefaultUser = useMemo(()=>{
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
    return false
  },[rpi])

  const setAPIKeys = async() => {
    

    let binanceapikeys:any =  prompt("Enter your API Keys! \n\n < Public : Secret >","") 
    if (!binanceapikeys) return
    if (binanceapikeys.split(":").length < 2) return
    
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        referral: splitKey[0],
        pin: splitKey[1],
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

  const leaveAsset = async (x:any) => {
      

    s__selectedToken(x)
    let new_tokensArrayObj = {...tokensArrayObj};
    delete new_tokensArrayObj[x];
    s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj));
    s__tokensArrayObj(new_tokensArrayObj)
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

  const claimOrSyncDatabase = async () => {
    if (isDefaultUser) return
  }








  

  const onFirstCarClicked = (clickCounter:any) => {
    if (clickCounter < 4)  return
    if (profitHistory.length == 0) return app.alert("error", "No orders found, bad reputation!")
    if (profitHistory.length > 0 && realProfitCount == profitHistory.length) {
      return app.alert("error", "No losses found, bad karma!")
    }
    
    let theIndex = -1
    for (let index = 0; index < profitHistory.length; index++) {
      if (profitHistory[index][1] == "loss"){ theIndex = index }
    }
    if (theIndex == -1)  return

    let aNewArray = [...profitHistory]
    aNewArray.splice(theIndex, 1)
    s__profitHistory(aNewArray)
    app.alert("success", "Successfully reduced debt, You claimed a job!")
  }
  const _s__projectionMode = (val:boolean) => {
    s__projectionMode(val)
  }




  // scene management and then minigame


  return (<>
    <Scene>
      {/* CONSTANT LANDING SCENE */}
      {/* CHAPTER 1 */}
      {/* BTC | Bitcoin | Bit Coin */}
      <Level1_Index1 {...{
          state:{tokensArrayObj, selectedToken, hasAnyToken, form, isDefaultUser, chartPos, chartRot, 
            isSelectedTokenDowntrend, selectedTimeframe, chartBoxPos, rpi,
          },
          calls:{toggleTrade, onTextClick, turnOn, trendUp, leaveAsset, turnOff, onTimeframeClick,s__rpi, s__LS_rpi,
            trendDown, join, s__chartBoxPos, setTutoStage, s__LS_tutoStage, s__LS_tokensArrayObj, 
          }
      }}/>
      




      {/* CHAPTER 2 */}
      {/* TEXT TUTORIALS */}
      <Level1_Index2 {...{
        state: {
          hasAnyToken, tutoStage, isDefaultUser, profitHistory, realProfitCount, LS_rpi,
        },
        calls: {
          setTutoStage, s__profitHistory
        }
      }}/>
      {/* MINI GAME */}
      {/* main road 1 */}
      {"btc" in tokensArrayObj && <> 
        <MainRoadEastWest />
        <MovingScoreCar calls={{onClicked:onFirstCarClicked}} />
        <group rotation={[0,Math.PI,0]} scale={[1,1,0.7]} position={[1,0,-0.3]}>
          <MovingStaticCar />
        </group>
      </>}
      {/* ETH | Ethereum | Ethirium */}
      {hasAnyToken && // ETH | Ethereum | Ethirium
        <group position={[0.75,0,-0.75]}>
            {!isDefaultUser && ("eth" in tokensArrayObj || ("btc" in tokensArrayObj)) &&
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth"
              mainModel="tower"
              tokensArrayArray={"eth" in tokensArrayObj ? tokensArrayObj["eth"] : null}
                refetchInterval={selectedToken == "eth" ? 4000 : 60000}
                unselectedColor={"#50545B"}
                onTextClick={()=>{onTextClick("eth")}} 
                setVelocityY={(data:any)=>{toggleTrade("eth",data)}}
                turnOn={()=>{turnOn("eth")}} turnOff={()=>{turnOff("eth")}}
                join={()=>{join("eth")}} leaveAsset={()=>{leaveAsset("eth")}}
                trendDown={()=>{trendDown("eth")}} trendUp={()=>{trendUp("eth")}} 
                onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("eth",tf)}}
              /> 
            }
        </group>
      }





      {/* CHAPTER 3 */}
      {/* account connected goal */}
      {hasAnyToken &&  (tutoStage.lvl > 3 && !!superuser) && !isDefaultUser &&
        <group position={[0,0,1.6]}>
          <SavedGoalPost calls={{triggerSyncGoodPlace,setAPIKeys, claim:claimOrSyncDatabase}}
            {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString }}
          />
        </group>
      }
      {/* second road */}
      {("link" in tokensArrayObj || (hasAnyToken &&
       (tutoStage.lvl > 3 && !!superuser) && !isDefaultUser)) && <RoadNorthSouth />
      }
      {/* LINK | Chain Link | chainlink */}
      {hasAnyToken && // LINK | Chain Link | chainlink
        <group position={[-0.3,-0.1,0.5]}>
          {("eth" in tokensArrayObj || "link" in tokensArrayObj) && tutoStage.lvl >= 3 &&
            <group position={[-0.52,0,0.46]} >
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link"
                tokensArrayArray={"link" in tokensArrayObj ? tokensArrayObj["link"] : null}
                refetchInterval={selectedToken == "link" ? 4000 : 60000}
                position={[0,0,0]} unselectedColor={"#50545B"}
                onTextClick={()=>{onTextClick("link")}} 
                setVelocityY={(data:any)=>{toggleTrade("link",data)}}
                turnOn={()=>{turnOn("link")}} turnOff={()=>{turnOff("link")}}
                join={()=>{join("link")}} leaveAsset={()=>{leaveAsset("link")}}
                trendDown={()=>{trendDown("link")}} trendUp={()=>{trendUp("link")}} 
                onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("link",tf)}}
              /> 
            </group>
          }
        </group>
      }
      




      {/* CHAPTER 4 */}
      {/* FTM | Fantom | Phantom */}
      {/* Loyal Player */}
      {hasAnyToken &&  (tutoStage.lvl > 3 && !!superuser && superuser.goodAttempts > 0) && !isDefaultUser &&
        <group position={[0,0,6]}>
          <GoodPlaceGoal calls={{triggerSyncGoodPlace,setAPIKeys, claim:claimOrSyncDatabase}} {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString }}
          />
        </group>
      }
      {/* PIPE STREAM LINES */}
      {"ftm" in tokensArrayObj && <> <MovingBoxAndPipe /> </>}
      {hasAllTokens && <>
        <Box args={[4, 0.25, 5]} position={[0, -1.2, -0.5]} castShadow receiveShadow>
          <meshStandardMaterial color={"#fff"} />
        </Box>
      </>}
      {hasAnyToken &&
        <group position={[-0.3, -0.1, 0.5]}>
          {("eth" in tokensArrayObj || "ftm" in tokensArrayObj) && !isDefaultUser && tutoStage.lvl > 3 &&
            <group position={[1.12, -0.05, 0.46]} rotation={[0, Math.PI / 2, 0]}>
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm"
                tokensArrayArray={"ftm" in tokensArrayObj ? tokensArrayObj["ftm"] : null}
                refetchInterval={selectedToken == "ftm" ? 4000 : 60000}
                position={[0, 0, 0]} unselectedColor={"#50545B"}
                onTextClick={() => { onTextClick("ftm") }}
                setVelocityY={(data: any) => { toggleTrade("ftm", data) }}
                turnOn={() => { turnOn("ftm") }} turnOff={() => { turnOff("ftm") }}
                join={() => { join("ftm") }} leaveAsset={() => { leaveAsset("ftm") }}
                trendDown={() => { trendDown("ftm") }} trendUp={() => { trendUp("ftm") }}
                onTimeframeClick={(token: any, tf: any) => { onTimeframeClick("ftm", tf) }}
              />
            </group>
          }
        </group>
      }
      
    </Scene>
  </>)
}

export default Component