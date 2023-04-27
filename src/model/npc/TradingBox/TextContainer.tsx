import { Vector3 } from "three"
import DynaText from "./DynaText"
import { useState } from "react"
import { Plane } from "@react-three/drei"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"gold",
    eth:"dola",
    link:"silver",
    ftm:"spirit",
  })
  
    return (<>
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
        <DynaText text={"Bought Price"+"" || ""}  color={0xffffff}
          position={new Vector3(+0.28,-0.349,-0.28)}
          isSelected={state.isSelectedId} font={0.06} 
        />
          </>
        }
        {
        <>

          <Plane rotation={[-Math.PI/2,0,0]} position={new Vector3(0,-0.3495,-0.04)} 
            args={[0.9,0.57]}
          >
            <meshStandardMaterial color={!!tokensArrayArray ? "#222222" : "#666666"} />
          </Plane>
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
      {state.isSelectedId && !!tokensArrayArray && // ELEVATED TOKEN NAME
        <DynaText text={state.token.toUpperCase()+"" || ""} color={state.isSelectedId ? state.tokenColor : state.tokenColor}
          position={new Vector3(-0.28,-0.2,-0.2)} rotation={[-Math.PI/4,0,0]}
          isSelected={state.isSelectedId}  font={0.22} onClick={()=>{}}
        />
      }
      {state.isSelectedId && !tokensArrayArray && // noELEVATED TOKEN NAME
        <DynaText text={state.token.toUpperCase()+"" || ""} color={state.isSelectedId ? state.tokenColor : state.tokenColor}
          position={new Vector3(-0.24,-0.349,-0.18)}
          isSelected={state.isSelectedId}  font={0.22} onClick={()=>{}}
        />
      }
      {!!tokensArrayArray && // CURRENT PRICE
        <DynaText text={state.queryUSDT.data+"" || ""} color={state.isSelectedId ? 0xaa0099 : 0xaaaaaa}
          onClick={()=>{}} font={0.29}
          position={new Vector3( + 0.06,-0.349,+0.1)} isSelected={state.isSelectedId} 
        />
      }
      {!!tokensArrayArray && 
      <DynaText text={"Current Price"+"" || ""}  color={0xffffff}
        position={new Vector3(+0.28,-0.349,-0.1)}
        isSelected={state.isSelectedId} font={0.06} 
      />
      }

      
      {/* <DynaText text={!!tokensArrayArray ? "SYNC" : "OFF"} // SYNC ON / OFF
        color={0xffffff}
        position={new Vector3(-0.43,-0.345,+0.46)}
        isSelected={state.isSelectedId}  font={0.04} onClick={()=>{}}
      /> */}
      {!!tokensArrayArray &&
        <DynaText color={"#ffffff"} // LIVE / DEMO
          text={"LIVE"} 
          // position={new Vector3(-0.31,-0.345,+0.46)}
          position={new Vector3(0.43,-0.345,+0.46)}
          isSelected={state.isSelectedId}  font={0.04} onClick={()=>{}}
        />
      }
      {!!tokensArrayArray && state.isSelectedId && state.selectedHasArray &&
      <DynaText text={!state.clicked ? "Send  BUY  Order" : "Send  SELL  Order"} // BUY / SELL
        color={!state.clicked ?  0x33ff33 : 0xff3333}
        position={new Vector3(!state.clicked ?  - 0.05 :  + 0.27,-0.34,0.455)}
        isSelected={state.isSelectedId}  font={0.05} onClick={()=>{}}
        />   
      } 
    </>)
}

export default Component