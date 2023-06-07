"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FaDoorClosed } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";


import { useAuth } from "@/../script/state/context/AuthContext";
import { AppContext } from "@/../script/state/context/AppContext";

const DisconnectPlayerForm = ({
}: { }) => {
  const app:any = useContext(AppContext)
  const { do:{ logout } }:any = useAuth()
  const [LS_binanceKeys, s__LS_binanceKeys] = useLocalStorage('binanceKeys', "user:0000")
  const triggerLogout = async () => {
    app.alert("neutral","Signin out, clearing cookies...")
    let res = await logout()
    console.log("res",res)
    app.alert("neutral","Logged out, clearing local storage...")
    s__LS_binanceKeys("user:0000")
    window.location.reload()
  }



  return (<>
    <div className="flex   ">
      <button className='py-1 px-2 tx-lg tx-white opaci-chov--50  noborder bord-r-5 z-100'
        style={{background:"#333333"}}
        onClick={triggerLogout}
      >
        <div className="Q_lg_x">Disconnect </div>
        <div className="Q_xs_lg"><FaDoorClosed /></div>
      </button>
    </div>
  </>);
};

export default DisconnectPlayerForm;