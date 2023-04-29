import { Vector3 } from "three"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"
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




      {/* COMPUTER */}
      {// non-hovered TOKEN NAME  
        <>
        <DynaText text={translation[state.token]+"" || ""} color={0x888888}   
          position={new Vector3(-0.4,-0.349,0.1)} rotation={[-Math.PI/2,0,Math.PI/2]}
          isSelected={state.isSelectedId}  font={0.12} onClick={()=>{}}
        />
      </>
    }
      {<>

        {  // hovered active button
        <>
          <group position={new Vector3(-0.1,-0.1,-0.)} >
            <group position={new Vector3(-0.12,0.02,-0.)}>
              { // north facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.1,0.25,0.01)}
                  rotation={[0,0,0]}
                  isSelected={state.isSelectedId}  font={0.22} onClick={()=>{}}
                />
              }
              { // south facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.1,0.25,0.01)}
                  rotation={[0,Math.PI,0]}
                  isSelected={state.isSelectedId}  font={0.22} onClick={()=>{}}
                />
              }
            </group>
          </group>
        </>}
      </>}
      { /* (state.isSelectedId || !!tokensArrayArray) && */ <>
        <group position={new Vector3(-0.1,-0.1,-0.)} // big monitor SCREEN
        >
          <mesh castShadow receiveShadow position={[0.0,0.15,-0.015]} >
            <boxGeometry args={[0.5, 0.5, 0.025]} />
            <meshStandardMaterial color={!!tokensArrayArray ? "#C7E4EC" : "#666666"} 
              transparent={!tokensArrayArray || !state.isSelectedId}
              opacity={0.5}
             />
          </mesh>        
        </group>
      </>}
      <group position={new Vector3(-0.1,0,-0.2)} >
        { // big monitor BASE
          <>
          <Cylinder args={[0.2, 0.3, 0.2, 4]} position={[0.0,-0.3,-0.05]} // base base
            receiveShadow castShadow
            rotation={[0,Math.PI/4*3,0]}
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder>
            <Cylinder args={[0.02, 0.03, 0.35, 4]} position={[0.0,-0.1,-0.05]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
            <Cylinder args={[0.02, 0.05, 0.28, 4]} position={[0.0,0.1,0.05]} // monitor connector
              receiveShadow castShadow
              rotation={[0,Math.PI/2,Math.PI/2]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          </>
        }
      </group>

      {state.isSelectedId && <>
        <group position={new Vector3(-0.1,0,-0.2)} >
          <Cylinder args={[0.42, 0.3, 0.64, 4]} position={[0.0,0.05,-0.128]} // big monitor CASE
            rotation={[Math.PI/2,Math.PI/4*3,0]} receiveShadow castShadow
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder>
        </group>
      </>}


    </>)
}

export default Component