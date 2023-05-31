import DynaText from "@/model/npc/TradingBox/DynaText"
import { Box, Cylinder } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import { useAuth } from "@/../script/state/context/AuthContext"


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

  const state_savedStringObj = useMemo (()=> {
    try {
      return !!state.savedString ? JSON.parse(state.savedString).trades : {}
    } catch (e:any) {
      return null
    }
  }, [state.savedString])
  const toggleProjection = () => {
    s__projectionMode(!projectionMode)
  }
  const userDatabaseArray = useMemo(()=>{
    try {
      return JSON.parse(superuser.trades)
    } catch (e:unknown) {

    }
    return []
  },[superuser])
  return (<>
    
    {state.hasAnyToken && !!superuser && superuser.subscription && <>
      <group position={[0,0,1.95]} rotation={[Math.PI/2,0,0]}>
        <Cylinder args={[0.12,0.12,0.1,projectionMode ? 4 : 3]} position={[0,0.25,0.15]} castShadow receiveShadow ref={$claimButton}
          onClick={()=>{toggleProjection()}}
        >
          <meshStandardMaterial color={!projectionMode ? "#a0dFf3" : "#f93"}/>
        </Cylinder>
        <Cylinder args={[0.16,0.16,0.12,12]} position={[0,0.22,0.15]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#ccc"}/>
        </Cylinder>
      </group>
    </>}
    {!!superuser && superuser.subscription && 
    <group>
      <DynaText text={superuser.subscription} color={ "#cc33cc"}
        position={[0,-1.06,0.5]}
          rotation={[-Math.PI/2,0,0]}

          // position={[0,-0.15,-1.19]} font={0.15}
        />
        
      <DynaText text={superuser.subscription == 1 ? "Node" : "Nodes"} color={ "#cc33cc"} font={0.09}
        position={[0.02,-1.06,0.7]}
          rotation={[-Math.PI/2,0,0]}

          // position={[0,-0.15,-1.19]} font={0.15}
        />
      </group>
    }
  

    {state.hasAnyToken &&
      <group position={[0,0,1.95]}>
        <Cylinder args={[0.25,0.25,0.75,6]} position={[0,-0.32,0]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#ccc"}/>
        </Cylinder>
      </group>
    }
    {state.hasAnyToken && <>
      <group position={[-0.15,-0.55,1.95]}>
          {userDatabaseArray.slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.07,0.11,0.07]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder[1] != "profit" ? "#f990" : "#ccc"}/>
              </Box>
            )
          })}
          {userDatabaseArray.slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder[1] != "profit"  ? "#aaaaaa" : "#ffaa33"}
                />
              </Box>
            )
          })}
          
          {[0,1,2,3,4].map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.6,0]}   key={index}>
                <meshStandardMaterial color={"#ff9933"}
                  transparent={true} opacity={0.15}
                />
              </Box>
            )
          })}
        </group>
      </>}
    </>
  )
}

export default Component