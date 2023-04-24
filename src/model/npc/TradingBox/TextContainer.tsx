import { Vector3 } from "three"
import DynaText from "./DynaText"
import { useState } from "react"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"gold",
    eth:"dola",
    link:"silver",
    ftm:"spirit",
  })
  
    return (<>
      {state.clicked &&
        <DynaText text={state.clickedPrice/state.queryUSDT.data < 1 ? "profit" : "loss"}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x00ff00 : 0xff0000}
          position={new Vector3(+0.3,-0.349,-0.33)}
          isSelected={state.isSelectedId} font={0.08} 
        />
      }
      
      {state.clicked &&
        <DynaText text={(((state.clickedPrice/state.queryUSDT.data)-1)*-100).toFixed(3)}  
          color={state.clickedPrice/state.queryUSDT.data < 1 ? 0x00ff00 : 0xff0000}
          position={new Vector3(+0.13,-0.349,-0.34)}
          isSelected={state.isSelectedId} font={0.06} 
        />
      }
        
      {state.clicked &&
        <DynaText text={""+state.clickedPrice+"" || ""}  color={0x006600}
          position={new Vector3(+0.25,-0.349,-0.2)}
          isSelected={state.isSelectedId} font={0.12} 
        />
      }
      {!state.isSelectedId &&
        <DynaText text={state.token.toUpperCase()+"" || ""} color={state.isSelectedId ? 0x222222 : 0x222222}
          position={new Vector3(-0.18,-0.349,-0.3)}
          isSelected={state.isSelectedId}  font={0.18} onClick={()=>{}}
        />
      }
      {state.isSelectedId &&
        <DynaText text={state.token.toUpperCase()+"" || ""} color={state.isSelectedId ? state.tokenColor : state.tokenColor}
          position={new Vector3(-0.18,-0.2,-0.3)} rotation={[-Math.PI/4,0,0]}
          isSelected={state.isSelectedId}  font={0.18} onClick={()=>{}}
        />
      }
      {!!tokensArrayArray &&
        <DynaText text={state.queryUSDT.data+"" || ""} color={state.isSelectedId ? 0xaa0099 : 0xaaaaaa}
          onClick={()=>{}} font={0.29}
          position={new Vector3( + 0.1,-0.349,+0.3)} isSelected={state.isSelectedId} 
        />
      }


      <DynaText text={!!tokensArrayArray ? "SYNC" : "OFF"} color={!!tokensArrayArray ?  0xaaaaaa : 0x555555}
        position={new Vector3(-0.44,-0.345,+0.28)}
        isSelected={state.isSelectedId}  font={0.04} onClick={()=>{}}
      />
      {!!tokensArrayArray &&
        <DynaText color={state.selectedHasArray ? "#55ff55" : "#f00"}
        text={"LIVE"} 
            position={new Vector3(-0.32,-0.345,+0.28)}
            isSelected={state.isSelectedId}  font={0.04} onClick={()=>{}}
        />
      }
      {!!tokensArrayArray && state.isSelectedId && state.selectedHasArray &&
      <DynaText text={!state.clicked ? "Send <BUY> Order" : "Send <SELL> Order"} color={!state.clicked ?  0x33ff33 : 0xff3333}
          position={new Vector3(!state.clicked ?  - 0.2 :  + 0.1,-0.349,+0.115)}
          isSelected={state.isSelectedId}  font={0.05} onClick={()=>{}}
        />   
      } 
    </>)
}

export default Component