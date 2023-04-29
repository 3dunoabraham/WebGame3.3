import { Vector3 } from "three"
import DynaText from "../DynaText"
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




      {!!tokensArrayArray &&
        <DynaText color={state.selectedHasArray ? "#009900" : "#ff0000"} // LIVE / DEMO
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            text={"LIVE" } 
          // position={new Vector3(-0.31,-0.345,+0.46)}
          position={new Vector3(0.38,-0.345,+0.44)}
          isSelected={state.isSelectedId}  font={0.07} 
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