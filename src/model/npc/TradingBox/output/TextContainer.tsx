import { Vector3 } from "three"
import DynaText from "../DynaText"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"

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
          position={new Vector3(-0.41,-0.349,0.09)} rotation={[-Math.PI/2,0,Math.PI/2]}
          isSelected={state.isSelectedId}  font={0.11} onClick={()=>{}}
        />
      </>
    }

{state.clicked && // PROFIT LOSS
        <DynaText text={"profit"}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x009900 : 0x777777}
          position={new Vector3(+0.28,-0.23,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.06} 
        />
      }
      {state.clicked && // PROFIT LOSS
        <DynaText text={"loss"}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x777777 : 0xff0000}
          position={new Vector3(+0.4,-0.23,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.06} 
        />
      }
      
      {state.clicked && // PRICE DIFFERENCE PERCENT
        <DynaText text={(((state.clickedPrice/state.queryUSDT.data)-1)*-100).toFixed(3)}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x009900 : 0xff0000}
          position={new Vector3(+0.33,-0.31,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.09} 
        />
      }
        
      {state.clicked && // CLICKED PRICE 
        <>
        <DynaText text={"Entry Price"+"" || ""}  color={0x000000}
          position={new Vector3(+0.33,-0.1,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.04} 
        />
          </>
        }
      {state.clicked &&
        <DynaText text={""+state.clickedPrice+"" || ""}  color={0x660066}
          position={new Vector3(+0.33,-0.165,-0.38)} rotation={[0,0,0]}
          isSelected={state.isSelectedId} font={0.09} 
        />
      }




      {!!tokensArrayArray &&
        <DynaText color={state.selectedHasArray ? "#559933" : "#cc0000"} // LIVE / DEMO
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            text={"LIVE" } 
          // position={new Vector3(-0.31,-0.345,+0.46)}
          position={new Vector3(0.38,-0.345,+0.44)}
          isSelected={state.isSelectedId}  font={0.08} 
        />
      }
      {!!tokensArrayArray && state.isSelectedId && state.selectedHasArray &&
      <DynaText text={!state.clicked ? "Send  BUY  Order" : "Send  SELL  Order"} // BUY / SELL
        color={!state.clicked ?  0x339933 : 0xff3333}
        position={new Vector3(!state.clicked ?  - 0.05 :  + 0.115,-0.34,0.455)}
        isSelected={state.isSelectedId}  font={0.05} onClick={()=>{}}
        />   
      } 
    </>)
}

export default Component