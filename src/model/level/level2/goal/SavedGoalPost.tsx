import DynaText from "@/model/npc/TradingBox/DynaText"
import { Box, Cylinder } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"


function Component ({calls, state}:any) {
  const $claimButton:any = useRef()
  const realProfitCount = useMemo(()=>{
    return state.profitHistory.filter((atrade:any, index:any) => {
      // console.log("atrade[1]", atrade[1])
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

  return (<>
    
    {state.hasAnyToken && <>
      <group position={[0,0,1.95]} rotation={[Math.PI/2,0,0]}>
        <Cylinder args={[0.14,0.14,0.1,6]} position={[0,0.25,0.15]} castShadow receiveShadow ref={$claimButton}
          onClick={calls.claim}
        >
          <meshStandardMaterial color={realProfitCount >= 4 ? "#00cc00" : "#f93"}/>
        </Cylinder>
        <Cylinder args={[0.16,0.16,0.12,12]} position={[0,0.22,0.15]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#ccc"}/>
        </Cylinder>
      </group>
  </>}

  <DynaText text={!!state_savedStringObj ? state_savedStringObj.split("&&&").length : "0"} color={ "#ff9900"}
    position={[0,-0.94,0.5]}
        rotation={[-Math.PI/2,0,0]}

        // position={[0,-0.15,-1.19]} font={0.15}
      />
  

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
          {state.profitHistory.slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.07,0.11,0.07]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder[1] != "profit" ? "#f990" : "#ccc"}/>
              </Box>
            )
          })}
          {state.profitHistory.slice(0,5).map((anOrder:any, index:any)=>{
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