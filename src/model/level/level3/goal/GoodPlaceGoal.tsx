import DynaText from "@/model/npc/TradingBox/DynaText"
import { Box, Cylinder, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import { useAuth } from "@/../script/state/context/AuthContext"
import BitCrush from "@/model/npc/BitCrush"

function Component ({calls, state, projectionMode, s__projectionMode}:any) {
  const { superuser, do:{login, demo}, jwt }:any = useAuth()
  
  const $claimButton:any = useRef()
  const realProfitCount = useMemo(()=>{
    return state.profitHistory.filter((atrade:any, index:any) => {
      return atrade[1] == "profit"
    }).length
  },[state.profitHistory])

  useFrame(()=>{
    if (!$claimButton.current) return
    if (realProfitCount < 4) return
    $claimButton.current.rotation.y += 0.01
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
          <Box args={[0.5,0.1,5.6]} position={[0,-1.12,1]} castShadow receiveShadow
            rotation={[0.03,0,0]}
          >
              <meshStandardMaterial color={"#eee"}/>
            </Box>
          <Box args={[0.1,0.4,0.2]} position={[0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box>
          <Box args={[0.1,0.4,0.2]} position={[-0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box>
          <Box args={[0.45,0.1,0.22]} position={[0,-0.65,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#d0d0d0"}/>
            </Box>
            <Cylinder position={[0,-0.7,3.5]} args={[0.05,0.15,0.8,4]} >
              <meshStandardMaterial color={"#bbb"}/>
            </Cylinder>
            <Cylinder position={[0,-1.05,3.5]} args={[0.3,0.15,0.25,5]} >
              <meshStandardMaterial color={"#aaa"}/>
            </Cylinder>
            <Sphere position={[0,-1,-1.65]}  args={[0.5, 8, 8]}>
              <meshStandardMaterial color={"#cff"} opacity={0.5} transparent={true}/>
            </Sphere>
          </>} 



    </>
  )
}

export default Component