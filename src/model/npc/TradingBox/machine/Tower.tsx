import { Vector3 } from "three"
import { useState } from "react"
import { Box, Cylinder, Plane, Torus } from "@react-three/drei"
import DynaText from "@/model/npc/TradingBox/DynaText"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"Bitcoin",
    eth:"Ethereum",
    link:"Chainlink",
    ftm:"Fantom",
  })
  const [DisplayPosition,s__DisplayPosition]:any = useState([0.4,0.02,-0.05])
    return (<>




      {<>

        {  // hovered active button
        <>
          <group position={new Vector3(-0.08,0.05,-0.08)} >
            <group position={new Vector3(-0.12,0.02,-0.)}>
              { // north facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.1,0.25,0.0)}
                  rotation={[0,0,0]}
                  isSelected={state.isSelectedId}  font={0.1} onClick={()=>{}}
                />
              }
              { // south facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.1,0.25,-0.035)}
                  rotation={[0,Math.PI,0]}
                  isSelected={state.isSelectedId}  font={0.1} onClick={()=>{}}
                />
              }
            </group>
          </group>
        </>}
      </>}
      { /* (state.isSelectedId || !!tokensArrayArray) && */ <>
        <group position={new Vector3(-0.1,-0.1,-0.)} // big monitor SCREEN
        >
          <mesh castShadow receiveShadow position={[0.0,0.42,-0.1]} >
            <boxGeometry args={[0.2, 0.14, 0.03]} />
            <meshStandardMaterial color={!!tokensArrayArray ? "#888a88" : "#666666"} 
              transparent={!tokensArrayArray || !state.isSelectedId}
              opacity={0.5}
             />
          </mesh>        
        </group>
      </>}
      {state.isSelectedId && <>
        <group position={new Vector3(-0.1,0,-0.2)} >
          {/* <Cylinder args={[0.42, 0.2, 0.64, 4]} position={[0.0,0.05,-0.128]} // big monitor CASE
            rotation={[Math.PI/2,Math.PI/4*3,0]} receiveShadow castShadow
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder> */}
          
         <Box receiveShadow castShadow  args={[0.08,0.8,0.3]} position={[0,-0.01,-0.05]}>
           <meshStandardMaterial color={"#808080"}  />
         </Box>
         <Box receiveShadow castShadow  args={[0.35,0.05,0.35]} position={[0,0.4,-0.05]}>
           <meshStandardMaterial color={"#999999"}  />
         </Box>
         <Box receiveShadow castShadow  args={[0.32,0.05,0.32]} position={[0,0.25,-0.05]}>
           <meshStandardMaterial color={"#808080"}  />
         </Box>
        </group>
      </>}
      <group position={new Vector3(-0.1,0,-0.2)} >
        { // big monitor BASE
          <>
         {!!tokensArrayArray && !!state.isSelectedId &&
           <Cylinder args={[0.2, 0.3, 0.25, 4]} position={[0.0,-0.32,-0.05]} // base base
            receiveShadow castShadow
            rotation={[0,Math.PI/4*3,0]}
          >
            <meshStandardMaterial color={"#707070"}  />
          </Cylinder>
         }
         <Cylinder args={[0.12, 0.15, 1, 4]} position={[0.0,0.08,-0.05]} // base connector
           receiveShadow castShadow
           rotation={[0,Math.PI/4*3,0]}
         >
           <meshStandardMaterial color={"#555555"}  />
         </Cylinder>
         <Box receiveShadow castShadow  args={[0.15,0.1,0.15]} position={[0,0.6,-0.05]}>
           <meshStandardMaterial color={"#666666"}  />
         </Box>
         <Box receiveShadow castShadow  args={[0.25,0.9,0.25]} position={[0,-0.015,-0.05]}>
           <meshStandardMaterial color={"#888888"}  />
         </Box>
         <Box receiveShadow castShadow  args={[0.08,0.86,0.3]} position={[0.11,-0.018,-0.05]} >
           <meshStandardMaterial color={"#707070"}  />
         </Box>
         <Box receiveShadow castShadow  args={[0.08,0.86,0.3]} position={[-0.11,-0.018,-0.05]} >
           <meshStandardMaterial color={"#707070"}  />
         </Box>
            <Cylinder args={[0, 0.1, 0.1, 4]} position={[0.0,0.7,-0.05]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#999999"}  />
            </Cylinder>
            <Cylinder args={[0.14, 0.05, 0.2, 4]} position={[0.0,0.5,-0.05]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#777777"}  />
            </Cylinder>
            <Cylinder args={[0.06, 0.06, 0.04, 7]} position={[0.0,0.5,0.05]} // monitor connector
              receiveShadow castShadow
              rotation={[0,Math.PI/2,Math.PI/2]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          </>
        }
      </group>



    </>)
}

export default Component