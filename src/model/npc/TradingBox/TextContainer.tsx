import { Vector3 } from "three"
import DynaText from "./DynaText"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"gold",
    eth:"dola",
    link:"silver",
    ftm:"spirit",
  })
  const [DisplayPosition,s__DisplayPosition]:any = useState([0.4,0.02,-0.05])
    return (<>

{/* <group position={[0,-1,0]}>

<DynaText text={"n"}  color={0x000}
  position={new Vector3(0,0,-2.5)}
  isSelected={state.isSelectedId} font={0.6} 
/>
</group>
    <group position={[0,-1,0]} rotation={[0,Math.PI,0]}>

      <DynaText text={"s"}  color={0x000}
        position={new Vector3(0,0,-2.5)}
        isSelected={state.isSelectedId} font={0.6} 
      />
    </group> */}



{
      // small screen surface
        <> 


        <group position={DisplayPosition}>
          
        <mesh castShadow receiveShadow position={[-0.0165,0.03,0]} >
          <boxGeometry args={[0.03, 0.28, 0.4]} />
          <meshStandardMaterial color={!state.isSelectedId ? "#888" : "#888"}  />
        </mesh>        
        
        <mesh castShadow receiveShadow position={[-0.03,-0.2,0]} // stand
        > 
          <boxGeometry args={[0.03, 0.4, 0.1]} />
          <meshStandardMaterial color={!state.isSelectedId ? "#888" : "#888"}  />
        </mesh>        


          <Plane rotation={[0,Math.PI/2,0]} position={[-0.001,-0.0,0]}  args={[0.35,0.18]}>
            <meshStandardMaterial color={!!tokensArrayArray ? "#222222" : "#666666"} />
          </Plane>
          
          {!!tokensArrayArray && // CURRENT PRICE
              <DynaText text={state.queryUSDT.data+"" || ""} color={state.isSelectedId ? 0xaa0099 : 0xaaaaaa}
                onClick={()=>{}} font={0.13} rotation={[0,Math.PI/2,0]} isSelected={state.isSelectedId} 
                position={new Vector3( 0,0,0)} 
              />
          }
          { 
            <DynaText text={"Current Price"+"" || ""}  color={!!tokensArrayArray ? 0xffffff : 0x666666} position={[0,0.125,0.02]}
              isSelected={state.isSelectedId} font={0.06}  rotation={[0,Math.PI/2,0]} 
              />
          }
        </group>
            
        </>
      }


      {state.clicked && // PROFIT LOSS
        <DynaText text={state.clickedPrice/state.queryUSDT.data < 1 ? "profit %" : "loss %"}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x009900 : 0xff0000}
          position={new Vector3(+0.33,-0.15,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.07} 
        />
      }
      
      {state.clicked && // PRICE DIFFERENCE PERCENT
        <DynaText text={(((state.clickedPrice/state.queryUSDT.data)-1)*-100).toFixed(3)}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x009900 : 0xff0000}
          position={new Vector3(+0.33,-0.25,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.09} 
        />
      }
        
      {state.clicked && // CLICKED PRICE 
        <>
        <DynaText text={"Order Entry Price"+"" || ""}  color={0x000000}
          position={new Vector3(+0.28,-0.349,-0.28)}
          isSelected={state.isSelectedId} font={0.05} 
        />
          </>
        }
      {state.clicked &&
        <DynaText text={""+state.clickedPrice+"" || ""}  color={0x006600}
          position={new Vector3(+0.28,-0.345,-0.18)}
          isSelected={state.isSelectedId} font={0.12} 
        />
      }
      {!state.isSelectedId && // TOKEN NAME
        <DynaText text={state.token.toUpperCase()+"" || ""} color={0xbbbbbb}
          position={new Vector3(-0.28,-0.349,-0.21)}
          isSelected={state.isSelectedId}  font={0.16} onClick={()=>{}}
        />
      }




      {/* CPU */}
      { state.isSelectedId && // noELEVATED TOKEN NAME
      <>
      <group position={new Vector3(-0.15,0,-0.2)} >
      <Cylinder args={[0.42, 0.3, 0.64, 4]} position={[0.0,0.05,-0.128]} 
        rotation={[Math.PI/2,Math.PI/4*3,0]} receiveShadow castShadow
      >
          <meshStandardMaterial color={"#888"}  />
        
      </Cylinder>
      <Cylinder args={[0.2, 0.3, 0.2, 4]} position={[0.0,-0.3,-0.05]} receiveShadow castShadow
        rotation={[0,Math.PI/4*3,0]}
      >
          <meshStandardMaterial color={"#888"}  />
        
      </Cylinder>
      </group>
      <group position={new Vector3(-0.15,-0.1,-0.)} >
        
        <mesh castShadow receiveShadow position={[0.0,0.15,-0.128]} >
          <boxGeometry args={[0.5, 0.5, 0.25]} />
          <meshStandardMaterial color={!!tokensArrayArray ? "#C7E4EC" : "#777777"}  />
        </mesh>        

          <group position={new Vector3(-0.12,0.02,-0.)}>
        {state.isSelectedId && !!tokensArrayArray && // ELEVATED TOKEN NAME
          <DynaText text={state.token.toUpperCase()+"" || ""} color={state.tokenColor}
              position={new Vector3(0.1,0.25,0.01)}
              // position={new Vector3(0,0.25,0)}
            // rotation={[-Math.PI/4,0,0]}
            rotation={[0,0,0]}

            isSelected={state.isSelectedId}  font={0.22} onClick={()=>{}}
          />
        }
        {state.isSelectedId && !tokensArrayArray && // noELEVATED TOKEN NAME
            <DynaText text={state.token.toUpperCase()+"" || ""} color={"#888"}
              position={new Vector3(0.1,0.25,0.01)}
              // position={new Vector3(-0.24,-0.349,-0.18)}
              rotation={[0,0,0]}
              isSelected={state.isSelectedId}  font={0.22} onClick={()=>{}}
            />
        }
          </group>
      </group>
      </>}

      

      
      {/* <DynaText text={!!tokensArrayArray ? "SYNC" : "OFF"} // SYNC ON / OFF
        color={0xffffff}
        position={new Vector3(-0.43,-0.345,+0.46)}
        isSelected={state.isSelectedId}  font={0.04} onClick={()=>{}}
      /> */}
      {!!tokensArrayArray &&
        <DynaText color={"#ff0000"} // LIVE / DEMO
          text={"LIVE"} 
          // position={new Vector3(-0.31,-0.345,+0.46)}
          position={new Vector3(0.43,-0.345,+0.46)}
          isSelected={state.isSelectedId}  font={0.04} onClick={()=>{}}
        />
      }
      {!!tokensArrayArray && state.isSelectedId && state.selectedHasArray &&
      <DynaText text={!state.clicked ? "Send  BUY  Order" : "Send  SELL  Order"} // BUY / SELL
        color={!state.clicked ?  0x339933 : 0xff3333}
        position={new Vector3(!state.clicked ?  - 0.05 :  + 0.175,-0.34,0.455)}
        isSelected={state.isSelectedId}  font={0.05} onClick={()=>{}}
        />   
      } 
    </>)
}

export default Component