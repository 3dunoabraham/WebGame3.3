"use client";

import { useContext } from "react";
import { useAuth } from "../../../../script/state/context/AuthContext";
import GoalPost from "./goal/GoalPost";
import TutorialContainer from "./tutorial/TutorialContainer";
import { AppContext } from "../../../../script/state/context/AppContext";

function Level1_Index2 ({state, calls, }:any) {
  const { user, superuser, do:{login, logout, fetchSuperuser, demo,},  jwt }:any = useAuth()
  const app:any = useContext(AppContext)
  

  const goalPostTips = async () => {
    if (state.isDefaultUser) {
      if (state.profitHistory.length  == 0) {
        app.alert("neutral", "Tip: Buy low and sell high to get points!")
        return
      } else {
        if (state.realProfitCount == 0) {
          app.alert("neutral", "Tip: Remove bad orders (losses) by fixing (click) white-roofed cars!")
        } else {
          app.alert("neutral", "Tip: Buy and sell profitably 4 times to level up!")
        }

      }
    } else {
      if (state.realProfitCount < 4) {
        app.alert("neutral", "Trying to sync account")
        // let loginRes = await login({
        //   referral:state.LS_rpi.split(":")[0],
        //   pin:state.LS_rpi.split(":")[1]
        // })
        // if (!loginRes) return 

      } else {
        calls.s__profitHistory([])

        app.alert("success", "Congratulations! you've reached the simulated!")
      }
    }

    if (state.tutoStage == 3) {
      calls.setTutoStage(4)
    }
  }

  return (<>
  
    <TutorialContainer
      state={{ hasAnyToken: state.hasAnyToken, tutoStage: state.tutoStage,
        isDefaultUser: state.isDefaultUser  
      }}
    />

      {/* local storage goal */}
      {state.hasAnyToken &&  state.tutoStage.lvl >= 3 &&
        <GoalPost calls={{claim:goalPostTips}}
          state={{ hasAnyToken: state.hasAnyToken,
            profitHistory: state.profitHistory, tutoStage: state.tutoStage
          }}
        />
      }
    
  </>)
}

export default Level1_Index2