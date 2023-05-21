import { Vector3 } from "three"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"
import DynaText from "@/model/npc/TradingBox/DynaText"
import BankRoofContainer from "@/3d/BankRoofContainer"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"Bitcoin",
    eth:"Ethereum",
    link:"Chainlink",
    ftm:"Fantom",
  })
  const [DisplayPosition,s__DisplayPosition]:any = useState([0.4,0.02,-0.05])
    return (<>


    
      {// state.isSelectedId && // big monitor BASE
          <group >
            <group scale={[0.24 ,0.12,0.24  ]} position={[0.03,0.0,0.29]}>
              <BankRoofContainer roofWidth={0.05} width={0.5} position={[-0.5, 2, -3]} wallWidth={0.05} 
                length={2}
              />
            </group>
          </group>
      }




      {<>

        {  // hovered active button
        <>
          <group position={new Vector3(-0.1,0.04,0.045)} >
            <group position={new Vector3(-0.1,0.02,-0.)}>
              { // north facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.1,0.235,0.01)}
                  rotation={[0,0,0]}
                  isSelected={state.isSelectedId}  font={0.13} onClick={()=>{}}
                />
              }
              { // south facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.1,0.235,-0.485)}
                  rotation={[0,Math.PI,0]}
                  isSelected={state.isSelectedId}  font={0.13} onClick={()=>{}}
                />
              }
            </group>
          </group>
        </>}
      </>}
      {state.isSelectedId  &&
        <group position={new Vector3(-0.1,-0.1,-0.)} >
        <mesh castShadow receiveShadow position={[0.0,0.27,-0.2]} >
          <boxGeometry args={[0.48, 0.025, 0.46]} />
          <meshStandardMaterial color={"#777777"} 
           />
        </mesh>
        </group>
}
      { /* (state.isSelectedId || !!tokensArrayArray) && */ <>
        <group position={new Vector3(-0.1,-0.13,-0.)} // big monitor SCREEN
        >
        <mesh castShadow={state.isSelectedId} receiveShadow position={[0.0,0.35,-0.2]} >
          <boxGeometry args={[0.45, 0.1, 0.4]} />
          <meshStandardMaterial color={"#888888"} 
           />
        </mesh>  
        <mesh castShadow receiveShadow position={[0.0,0.36,-0.2]} >
          <boxGeometry args={[0.58, 0.025, 0.52]} />
          <meshStandardMaterial color={"#777777"} 
           />
        </mesh>
          <mesh castShadow receiveShadow position={[0.0,0.15,-0.23]} >
            <boxGeometry args={[0.44, 0.5, 0.32]} />
            <meshStandardMaterial color={"#858585"} 
             />
          </mesh>        
        </group>
      </>}
      <group position={new Vector3(-0.1,0,-0.2)} >
          <Cylinder args={[0.33, 0.38, 0.2, 4]} position={[0.0,-0.3,-0.02]} // base base
            receiveShadow castShadow
            rotation={[0,Math.PI/4*3,0]}
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder>
        {state.isSelectedId && // big monitor BASE
          <>
          
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[-0.2,0.04,0.17]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[-0.1,0.04,0.17]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[0.1,0.04,0.17]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[0.2,0.04,0.17]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>

            <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[0.0,0.04,0.17]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
            {/* <Cylinder args={[0.02, 0.05, 0.28, 4]} position={[0.0,0.1,0.05]} // monitor connector
              receiveShadow castShadow
              rotation={[0,Math.PI/2,Math.PI/2]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder> */}
          </>
        }
      </group>

      {state.isSelectedId && <>
        <group position={new Vector3(-0.1,0,-0.2)} >
          {/* <Cylinder args={[0.42, 0.3, 0.64, 4]} position={[0.0,0.05,-0.128]} // big monitor CASE
            rotation={[Math.PI/2,Math.PI/4*3,0]} receiveShadow castShadow
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder> */}
        </group>
      </>}


    </>)
}

export default Component