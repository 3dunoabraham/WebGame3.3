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
      {/* SMALL ROOF SEPARATOR */}
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
          {/* INNER ROOF SEPARATOR */}
        <mesh castShadow={state.isSelectedId} receiveShadow position={[0.0,0.35,-0.2]} >
          <boxGeometry args={[0.45, 0.1, 0.4]} />
          <meshStandardMaterial color={"#888888"} 
           />
        </mesh>  
        {/* ROOF SEPARATOR */}
        <mesh castShadow receiveShadow position={[0.0,0.36,-0.2]} >
          <boxGeometry args={[0.58, 0.025, 0.52]} />
          <meshStandardMaterial color={"#777777"} 
           />
        </mesh>
        {/* BUILDING BODY */}
          <mesh castShadow receiveShadow position={[0.0,0.15,-0.23]} >
            <boxGeometry args={[0.44, 0.5, 0.32]} />
            <meshStandardMaterial color={"#858585"} 
             />
          </mesh>        
        </group>
      </>}

      <group position={new Vector3(-0.1,0,-0.2)} >
        {/* BUILDING BASE */}
          <Cylinder args={[0.33, 0.38, 0.2, 4]} position={[0.0,-0.3,-0.02]}
            receiveShadow castShadow
            rotation={[0,Math.PI/4*3,0]}
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder>
          {/* STAIRS */}
          <group position={new Vector3(-0.17,-0.07,-0.)} >
          <mesh castShadow receiveShadow position={[0.1,-0.28,0.2]} >
            <boxGeometry args={[0.3, 0.1, 0.32]} />
            <meshStandardMaterial color={"#858585"} 
             />
          </mesh>
          <mesh castShadow receiveShadow position={[0.1,-0.24,0.15]} >
            <boxGeometry args={[0.25, 0.1, 0.32]} />
            <meshStandardMaterial color={"#858585"} 
             />
          </mesh>
          <mesh castShadow receiveShadow position={[0.1,-0.2,0.1]} >
            <boxGeometry args={[0.2, 0.1, 0.32]} />
            <meshStandardMaterial color={"#858585"} 
             />
          </mesh>        
        </group>



        {state.isSelectedId && 
          <>
          
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[-0.2,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[-0.1,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[0.1,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[0.2,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>

            <Cylinder args={[0.02, 0.03, 0.48, 4]}
              position={[0.0,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
          </>
        }
      </group>


    </>)
}

export default Component