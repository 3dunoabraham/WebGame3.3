import GreenBuy from "./GreenBuy"
import SellHigh from "./SellHigh"
import SetDemoOff from "./SetDemoOff"
import TutorialGoal from "./TutorialGoal"
import ClickToStart from "./ClickToStart"

function Component ({state}:any) {
  return (<>
    {state.hasAnyToken && !state.tutoStage.lvl && <SetDemoOff /> }
    {state.hasAnyToken && state.tutoStage.lvl == 1  && <GreenBuy  /> }
    {state.hasAnyToken && state.tutoStage.lvl == 2 && <SellHigh /> }
    { state.hasAnyToken && state.tutoStage.lvl == 3  && <TutorialGoal /> }
  </>)
}

export default Component