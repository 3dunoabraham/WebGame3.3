import { Cylinder, SpotLight, Torus, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import * as THREE from "three";
import DynaText from "./DynaText";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleJsonArray, parseDecimals } from "@/../script/util/helper";
import TableLegs from "./TableLegs";
import Toggles from "./Toggles";
import TableBody from "./TableBody";
import BouncingThing from "./BouncingThing";
import TimeframeButtons from "./TimeframeButtons";
import TextContainer from "./TextContainer";
// import { tokenColors } from "../../core/Scene";
// import { DEFAULT_TIMEFRAME_ARRAY } from "@/components/scripts/constants";

export const DEFAULT_TIMEFRAME_ARRAY = ["3m","15m","4h","1d","1w"]  
export const tokenColors:any = {
  "btc": "#EE8E1B",
  "eth": "#3EDF5D",
  "link": "#2A5ADA",
  "ftm": "#1A6AFF",
}

type BoxProps = {
  position?: [number, number, number];
  camera?: any;
  boundaries?: any;
  wallWidth?: any;
  score?: any;
  s__score?: any;
  velocityX?: any;
  setVelocityX?: any;
  velocityY?: any;
  setVelocityY?: any;
  timeframe: any;
  token: any;
  onTextClick: any;
  form: any;
  refetchInterval?: any;
  unselectedColor?: any;
  tokensArrayArray?: any;
  turnOn?: any;
  turnOff?: any;
  leave?: any;
  join?: any;
  trendUp?: any;
  trendDown?: any;
  onTimeframeClick?: any;
};

const Component = forwardRef(({

// export default function Component({
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
}: any, ref:any) => {
  const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
  const baseToken = "USDT"
  
  // const tokensReqObj:any = useMemo(()=>{
  //   return ( [token].reduce((acc, aToken) => (
  //     { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
  //     ), {}))
  // },[token])
  
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [clickedPrice, s__clickedPrice] = useState(0)
    const [uid, s__uid] = useState("")
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
      // console.log("asd", theList[0])
      let prr = parseDecimals(theList[0].price)
      // console.log("prr", token, prr)
      return prr
    }
})

  const [clicked, setClicked] = useState(false);
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
    s__uid(LS_uid)
    s__clientIP(LS_uid.split(":")[0])
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
  const selectedTimeframe = useMemo(()=>{
    return form.id.split("USDT")[1].toLowerCase()
  },[form.id])
  const selectedTimeframeIndex = useMemo(()=>{
    return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
  },[selectedTimeframe])
  
  const selectedHasArray = useMemo(()=>{
    return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
  },[tokensArrayArray, selectedTimeframeIndex])

  const isDowntrend = useMemo(()=>{
    return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].mode
  },[selectedTimeframeIndex,tokensArrayArray])

  return (
    <group>

      {!!tokensArrayArray && !clicked && <>
        <mesh  ref={playerMesh}
          position={[ position[0]+0.325, -0.37, position[2]-0.38, ]}          
        >
          <boxGeometry args={[0.15, 0.18, 0.1]} />
          <meshStandardMaterial transparent={true} opacity={0.5} color={!isSelectedId ? "#777777" : "#777777"}  />
        </mesh>
      </>}


      {/* platform */}


      

      <group position={position} /* rotation={[Math.PI/2,0,0]} */ >
        <TextContainer tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
        

      </group>
      <group position={position}>
        <BouncingThing tokensArrayArray={tokensArrayArray} _bouncingThing={bouncingThing}
          isSelectedId={isSelectedId} token={token} clicked={clicked}
        />

{/*         
        <TimeframeButtons tokensArrayArray={tokensArrayArray}
          state={{isSelectedId, score, token, selectedTimeframe, selectedTimeframeIndex}}
          calls={{onTimeframeClick,onTextClick,}}
        /> */}
        
        
        <TableBody state={{boundaries, wallWidth, isSelectedId, clicked, hasAnyToken:!!tokensArrayArray}}
            calls={{ onTextClick: (e:any) => {onTextClick();e.stopPropagation()}}}

         />

        <TableLegs />
        
        {/* toggles sync join trend */}
        <Toggles state={{score, isSelectedId, selectedHasArray,isDowntrend,}}
            tokensArrayArray={tokensArrayArray}
            calls={{join, leave, onTextClick, turnOff, turnOn,trendDown,trendUp}}
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




      {/* buy/sell button */}
      {isSelectedId && selectedHasArray && <>
      <mesh castShadow receiveShadow onClick={() => toggleGame()} scale={score.score ? 1 : 3}
        position={[
          !clicked ? position[0] - 0.05 : position[0] + 0.11,
          clicked ? position[1] - 0.33 : position[1] - 0.3,
          position[2]+0.34,
        ]}        
      >
        <boxGeometry args={[0.1, clicked ? 0.015 : 0.04, 0.05]} />
        <meshStandardMaterial color={clicked ? "red" : "#00ff00"}  />
      </mesh>
      
      </>}


      {/* mini buttons */}
      

      {isSelectedId && isDowntrend && <>
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
      {isSelectedId && !!tokensArrayArray &&  clicked && 
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[ position[0] - 0.4, position[1] - 0.35, position[2] + 0.1]}
        >
          <boxGeometry args={[0.02, 0.09, 0.02]} />
          <meshStandardMaterial color={"#FEEA4D"} />
        </mesh>
      }


    </group>
  );
})

Component.displayName = 'TradingBox'

export default Component