import DynaText from "@/model/npc/TradingBox/DynaText"
import { Box, Cylinder, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import { useAuth } from "@/../script/state/context/AuthContext"
import BitCrush from "@/model/npc/BitCrush"

function Component ({calls, state, projectionMode, s__projectionMode}:any) {
  const { superuser, do:{login, demo}, jwt }:any = useAuth()
  const [bridgeZRot, s__bridgeZRot] = useState(-1)
  const $bridgeRoad:any = useRef()
  const $claimButton:any = useRef()
  const realProfitCount = useMemo(()=>{
    return state.profitHistory.filter((atrade:any, index:any) => {
      return atrade[1] == "profit"
    }).length
  },[state.profitHistory])

  useFrame(()=>{
    // if (!$claimButton.current) return

    
    if (!state.projectionMode) {
      
      if (bridgeZRot > -1) {
        s__bridgeZRot(bridgeZRot-0.05)
      }
    } else {
      
      if (bridgeZRot < 0) {
        s__bridgeZRot(bridgeZRot+0.01)
      }
    }


    // if (realProfitCount < 4) return
    // $claimButton.current.rotation.y += 0.01

    // if ()
    // if (!$bridgeRoad.current) return
  })

  return (<>
{state.hasAnyToken && <>

            
            <Cylinder position={[0,-0.27,6]} args={[3,3,0.15,4]} >
              <meshStandardMaterial color={"#996644"}/>
            </Cylinder>
            
            <Cylinder position={[0,-0.2,6]} args={[3.02,3.02,0.02,4]} >
              <meshStandardMaterial color={"#66ff65"}/>
            </Cylinder>
            <BitCrush />

            {/* LONG BRiDGE */}
          {/* <Box args={[0.5,0.1,5.6]} position={[0,-1.12,1]} castShadow receiveShadow
            rotation={[0.03,0,0]}
          >
              <meshStandardMaterial color={"#eee"}/>
            </Box> */}

            
        <group position={[0.75,-0.5,0+0.25]} >
            {/* minicity east */}
            <Box args={[1,0.1,0.5]}  castShadow receiveShadow position={[0,0,0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            {/* <Box args={[1,0.1,0.5]}  castShadow receiveShadow position={[0,0,-0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box> */}
        </group>
        <group position={[-0.75,-0.5,0+0.25]} >
            {/* minicity west */}
            <Box args={[1,0.1,0.5]}  castShadow receiveShadow position={[0,0,0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            {/* <Box args={[1,0.1,0.5]}  castShadow receiveShadow position={[0,0,-0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box> */}
        </group>


        
        {/* farmcity */}
        <group position={[0.65,-0.5,+3]} >
            {/* minicity east */}
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[0,0,0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[0,0,-0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
        <group position={[-0.65,-0.5,+3]} >
            {/* minicity west */}
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[0,0,0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[0,0,-0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>






            
            {/* {state.projectionMode && */}
        <group position={[0,-0.5,-2.1]} ref={$bridgeRoad} rotation={[bridgeZRot,0,0]}>
            {/* ROAD */}
            <Box args={[0.5,0.06,1]}  castShadow receiveShadow position={[0,0,0.5]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
        <group position={[0,-0.5,1.3]} >
            {/* ROAD */}
            <Box args={[0.45,0.055,5]}  castShadow receiveShadow
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
        {/* } */}



            
          {/* <Box args={[0.1,0.4,0.2]} position={[0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box> */}
          {/* <Box args={[0.1,0.4,0.2]} position={[-0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box> */}
          <Box args={[0.45,0.1,0.02]} position={[0,state.projectionMode ? -0.513 : -0.31,-2.1]} castShadow receiveShadow>
              <meshStandardMaterial color={"#d0d0d0"}/>
            </Box>
            <Box args={[0.05,0.3,0.05]} position={[0.25,-0.35,-2.1]} castShadow receiveShadow>
              <meshStandardMaterial color={"#d0d0d0"}/>
            </Box>

            <Cylinder position={[0,-0.7,3.5]} args={[0.05,0.15,0.8,4]} >
              <meshStandardMaterial color={"#bbb"}/>
            </Cylinder>
            <Cylinder position={[0,-1.05,3.5]} args={[0.3,0.15,0.25,5]} >
              <meshStandardMaterial color={"#aaa"}/>
            </Cylinder>

            {/* <Sphere position={[0,-1,-1.65]}  args={[0.5, 8, 8]}>
              <meshStandardMaterial color={"#cff"} opacity={0.5} transparent={true}/>
            </Sphere> */}
          </>} 



    </>
  )
}

export default Component