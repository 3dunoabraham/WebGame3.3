import BuyLowSellHigh from "./BuyLowSellHigh"
import ClickToStart from "./ClickToStart"
import SellHigh from "./SellHigh"
import SetPriceAlarm from "./SetPriceAlarm"
import TutorialGoal from "./TutorialGoal"
import TutorialLogin from "./TutorialLogin"





function Component ({state, calls}:any) {
    return (<>
        
      {!state.hasAnyToken && <>
        <ClickToStart calls={{join:calls.join}} />
      </>}
      {state.hasAnyToken && !state.tutoStage.lvl &&
      
        <group position={[-0.42,-0.35,-0.24]} scale={0.3} onClick={()=>{calls.turnOffDemo()}}>
          <SetPriceAlarm />
        </group>
      }
      {state.hasAnyToken && state.tutoStage.lvl == 1 &&
      
      <group position={[-0.7,-0.24,-0.5]} scale={0.35} >
      <BuyLowSellHigh  />
    </group>
      }

{state.hasAnyToken && state.tutoStage.lvl == 2 &&
        
        <group position={[-0.7,-0.24,-0.5]} scale={0.35} >
        <SellHigh />
      </group>
        }
        {state.hasAnyToken && state.tutoStage.lvl == 4 &&
          
        <group position={[-0.31,-0.35,-1.9]} scale={0.35}  onClick={()=>{calls.setTutoStage(3)}}>
        <TutorialGoal />
      </group>
        }

{state.hasAnyToken && state.tutoStage.lvl == 3 &&
          
          <group position={[-0.6,-1.3,1.]} rotation={[0,Math.PI/2,0]} scale={0.35} onClick={()=>{calls.firstLogin()}}  >
          <TutorialLogin />
        </group>
          }    
    </>)
}

export default Component