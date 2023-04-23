"use client";

import { useContext, useEffect } from "react"
import { useState } from "react"
import { useTimeout } from "usehooks-ts"
import { ScreenNotification } from "./ScreenNotification";
import { AppContext } from "../../../../../../../script/state/context/AppContext";


function Component({
    // msg,
    delay = 4000,
    // s__msg,
    badgeClass="ims-badge-faded",
}: any) {

    const app:any = useContext(AppContext)
    
    // s__msg: (val:any)=>(app.alertMap__do.set("wait", val)), msg:app.alertMap.get("wait")

    // useEffect(()=>{
    //     // console.log("test here")
    //     app.alertReset()
    //     // if (app.alertMap.get("wait") == "") return
        
    // },[])

    useEffect(()=>{
        // console.log("test here")
        if (app.alertMap.get("wait") == "") return
        
    },[app.alertMap])
    const onHide = ()=>{
        // s__msg("")
    }

    if (app.alertMap.get("wait") != "") {
        return (
            <ScreenNotification s__msg={app.s__msg} delay={delay} onHide={onHide} alertMsg={app.alertMap.get("wait")} 
                badgeClass={badgeClass}
            />
        )
    }
    return <></>
}

export default Component