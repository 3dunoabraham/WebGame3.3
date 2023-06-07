import { useDepthBuffer } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleJsonArray, parseDecimals } from "@/../script/util/helper";
import TableLegs from "./machine/TableLegs";
import TableBody from "./machine/TableBody";
import BouncingThing from "./BouncingThing";
import TimeframeButtons from "./input/TimeframeButtons";
import TextContainer from "./output/TextContainer";
import DeskToggles from "./input/DeskToggles";
import DeskButtons from "./input/DeskButtons";
import Computer from "./machine/Computer";
import MiniScreen from "./output/MiniScreen";
import BankRoofContainer from "@/3d/BankRoofContainer";
import Bank from "./machine/Bank";
import MiniCitySign from "./output/MiniCitySign";
import Tower from "./machine/Tower";

export const DEFAULT_TIMEFRAME_ARRAY = ["3m","15m","4h","1d","1w"]  
export const tokenColors:any = {
  "btc": "#FE8E1B",
  "eth": "#3EDF5D",
  "link": "#2A5ADA",
  "ftm": "#1A6AFF",
}
const Component = forwardRef(({
  mainModel = "pc",
  turnOn, turnOff, leave, join,
  trendDown, trendUp,
  tokensArrayArray,
  unselectedColor="#48721E",
  refetchInterval=3000,
  form= null, token= "btc", timeframe= "3m",
  wallWidth=0.1,
  position=[0,0,0], boundaries=[1,1,1],
  onTextClick=()=>{}, onTimeframeClick=()=>{},score=0,s__score=()=>{},
  velocityX=0, setVelocityX=()=>{}, velocityY=0, setVelocityY=()=>{},
}: any, ref:any) => {
  const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
  const baseToken = "USDT"
    
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    const [rpi, s__rpi] = useState("")
    const [showAllTokens,s__showAllTokens] = useState<any>(true)
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');
    const DEFAULT_TOKEN_OBJ = {
        mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
        min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
    }
    const p__klinesArray = useMemo(()=>{
        let slicedArray = [...klinesArray]
        for (let index = 0; index < chopAmount; index++) { slicedArray.push(klinesArray[499]) }
        
        return slicedArray.slice(slicedArray.length-500,slicedArray.length)
    },[klinesArray,chopAmount])
    const queryUSDT:any = useQuery({ queryKey: ['usdt'+token], refetchInterval: refetchInterval,
    queryFn: async () => {
      let theList = await fetchMultipleJsonArray(( [token].reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
        ), {})))
      let prr = parseDecimals(theList[0].price)
      return prr
    }
})
const selectedTimeframe = useMemo(()=>{
  return form.id.split("USDT")[1].toLowerCase()
},[form.id])
const selectedTimeframeIndex = useMemo(()=>{
  return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
},[selectedTimeframe])


const selectedHasArray = useMemo(()=>{
  return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
},[tokensArrayArray, selectedTimeframeIndex])

    const [clickedPrice, s__clickedPrice] = useState(selectedHasArray ? parseFloat(`${tokensArrayArray[selectedTimeframeIndex].price}`) : 0)
    const [clicked, setClicked] = useState(selectedHasArray ? !!tokensArrayArray[selectedTimeframeIndex].buy : false);
  const meshRef = useRef<Mesh>();
  const bouncingThing:any = useRef<Mesh>();
  const playerMesh:any = useRef<Mesh>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [elapsed, setElapsed] = useState<any>(0);
  const viewport = useThree((state) => state.viewport);
  const tokenColor = useMemo(()=>{
    return tokenColors[token]
  },[token])
  const isSelectedId = useMemo(()=>{
    return form && form.id == token.toUpperCase()+"USDT"+timeframe.toUpperCase()
  },[form])
  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    s__rpi(LS_rpi)
    s__clientIP(LS_rpi.split(":")[0])
  },[])

  useImperativeHandle(ref, () => {
    return {
      toggleGame,
    };
  }, []);


  const toggleGame = () => {
    if (clicked) 
    {
      setVelocityX(0)
      setVelocityY({value:0,price:queryUSDT.data})
      setClicked(false)
      
      return
    }
    s__score({score:1,maxScore: 0, velocityX:0,velocityY:0})
    setClicked(true)
    setVelocityX((0.05+((Math.random()/2)-0.55)) / 5)
    setVelocityY({value:0.05,price:queryUSDT.data})
    s__clickedPrice(queryUSDT.data)
  }

  const selectedToken = useMemo(()=>{
    return form.id.split("USDT")[0].toLowerCase()
  },[form.id])
  // const selectedHasArray = useMemo(()=>{
  //   return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
  // },[tokensArrayArray, selectedTimeframeIndex])

  const isDowntrend = useMemo(()=>{
    return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].mode
  },[selectedTimeframeIndex,tokensArrayArray])



  return (
    <group>

      
      <group position={position} >
        <TextContainer tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>

      {mainModel == "pc" && 
        <group position={position} >
        <Computer tokensArrayArray={tokensArrayArray}
            state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
            calls={{onTextClick,turnOff,turnOn}}
          />
        </group>
    }
    {mainModel == "bank" && 
      <group position={position} >
        <Bank tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>
    }
    {mainModel == "tower" && 
      <group position={position} >
        <Tower tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>
    }
      
      <group position={position} >
        <MiniCitySign tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>

      {/* <group position={position} >
        <MiniScreen tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group> */}


      
      <group position={position}>
        <BouncingThing tokensArrayArray={tokensArrayArray} _bouncingThing={bouncingThing}
          livestate={{clickedPrice, queryUSDT}}
          isSelectedId={isSelectedId} token={token} clicked={clicked}
        />
        {!!tokensArrayArray && selectedHasArray &&
          <group position={[-0.18,0,0.2]}>
            <TimeframeButtons tokensArrayArray={tokensArrayArray}
              state={{isSelectedId, score, token, selectedTimeframe, selectedTimeframeIndex}}
              calls={{onTimeframeClick,onTextClick,}}
            />
          </group>
        }
        
        
        <TableBody state={{boundaries, wallWidth, isSelectedId, clicked, hasAnyToken:!!tokensArrayArray}}
            calls={{ onTextClick: (e:any) => {onTextClick();e.stopPropagation()}}}

         />

        <TableLegs />
        
        {/* toggles sync join trend */}
        <DeskToggles state={{score, isSelectedId, selectedHasArray,isDowntrend,}}
            tokensArrayArray={tokensArrayArray}
            calls={{join, leave, onTextClick, turnOff, turnOn,trendDown,trendUp}}
          />
          
        <DeskButtons state={{score, isSelectedId, selectedHasArray,isDowntrend,clicked}}
            tokensArrayArray={tokensArrayArray}
            calls={{join, leave, onTextClick, turnOff, turnOn,trendDown,trendUp,toggleGame}}
          />
          
        
        {/* OPEN VIRTUAL ORDER SCREEN */}
        {clicked &&  <>
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[  + 0.33,  - 0.2,  - 0.41 ]}
        >
          <boxGeometry args={[0.1, 0.095, 0.01]} />
          <meshStandardMaterial color={"#777777"}  />
        </mesh>
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3} 
          position={[  + 0.33,  - 0.22,  - 0.40 ]}
        >
          <boxGeometry args={[0.08, 0.095, 0.01]} />
          <meshStandardMaterial emissive={tokenColor} color={"#777777"}  />
        </mesh>
        </>}

      </group>






      {/* mini buttons */}
      
      {/* EXCLAMATION MARK */}
      {isDowntrend && <>
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[ position[0] - 0.42, position[1] - 0, position[2] - 0.42 ]}
        >
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[ position[0] - 0.42, position[1] - 0.28, position[2] - 0.42]}
        >
          <boxGeometry args={[0.02, 0.03, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </>}
      {/* mini  yellow button */}
      {isSelectedId && !!tokensArrayArray &&
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[ position[0] - 0.23, position[1] - 0.28, position[2] + 0.2]}
        >
          <boxGeometry args={[0.02, 0.06, 0.015]} />
          <meshStandardMaterial color={ !!tokensArrayArray &&  clicked ? "#ffa066" : "#FEEA4D"} />
        </mesh>
      }


    </group>
  );
})

Component.displayName = 'TradingBox'

export default Component