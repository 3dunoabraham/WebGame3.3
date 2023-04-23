"use client";

import { useEffect, useMemo, useState } from "react";
import { useMap } from "usehooks-ts";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import { DEFAULT_ALERT_MAPARRAY } from "@/scripts/constants";
import { AppContext } from "@/../script/state/context/AppContext";
import Providers from "@/../script/state/context/Providers";
import AlertContainer from "@/dom/organism/ims/items/atoms/common/AlertContainer";
import { useRouter } from "next/router";

export default function Layout({ children }:any) {
    const router = useRouter()
    const { query } = useRouter()
    const queryClient = new QueryClient()
    const [filters,s__filters] = useState({})
    const [alertMap,alertMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
    const [sidebarLinks,s__sidebarLinks] = useState([])
    const [sidebarPages,s__sidebarPages] = useState([])
    const [session,s__session] = useState([])



    const alertNotification = (category="neutral", msg="")=>{
		alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
        setTimeout(()=>{alertMap__do.set(category, msg)},100)
    }
	let appValue = useMemo(()=>{
		return {
            institution: {
                title: "ServicePad",
                email: "support@servicepad.com",
                titleSupport: "ServicePad Customer Support:",
                copyrights: "© 2022 ServicePad, Inc. All rights reserved.",
            },
            THEME: {
                primaryColor: "#3E5F58",
                textColorLight: "#ffffff"
            },
            online: query.offline == undefined,
            query,
            filters,s__filters,unfilter:(key)=>{
                let newObj = {...filters}
                delete newObj[key]
                s__filters(newObj)
            },
            sidebarLinks,s__sidebarLinks,
            sidebarPages,s__sidebarPages,
            session,s__session,
            alertReset:()=>{alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
			alert:(category, msg)=>{alertNotification(category, msg)}
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	},[alertMap, filters, query,sidebarLinks, sidebarPages])
    

    // useEffect(()=>{
    //     // let sales_status = app.query.stts
    //     console.log("query layout",  router, query)
    //     // app.s__filters({})
    // },[query])
    
    return (
    <Providers>
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={appValue}>
                {!appValue.online &&
                    <div className=" pos-fix z-1001 w-100 _ddr " style={{height:"2px"}}>
                    </div >
                }
                {/* <Loading /> */}

                {children}
                <div >
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} 
                    />
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("success", val)), msg:alertMap.get("success")}}
                        badgeClass="ims-badge-success"
                    />
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("warn", val)), msg:alertMap.get("warn")}}
                        badgeClass="ims-badge-secondary" 
                    />
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("error", val)), msg:alertMap.get("error")}}
                        badgeClass="ims-badge-error" 
                    />
                </div>
            </AppContext.Provider>
        </QueryClientProvider>
    </Providers>
    )
}


// function Loading() {
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const handleStart = (url) => (url !== router.asPath) && setLoading(true);
//         const handleComplete = (url) => (url === router.asPath) && setLoading(false);

//         router.events.on('routeChangeStart', handleStart)
//         router.events.on('routeChangeComplete', handleComplete)
//         router.events.on('routeChangeError', handleComplete)

//         return () => {
//             router.events.off('routeChangeStart', handleStart)
//             router.events.off('routeChangeComplete', handleComplete)
//             router.events.off('routeChangeError', handleComplete)
//         }
//     })
    
//     return loading && (
//         <div className=" pos-fix z-1001 w-100 _ddg " style={{height:"2px"}}></div >
//     );
// }