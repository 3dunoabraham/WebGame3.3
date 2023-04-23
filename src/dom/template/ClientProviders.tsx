"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DEFAULT_ALERT_MAPARRAY } from "@/../script/constant";

import AuthProvider from '../../../script/state/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { useMap } from 'usehooks-ts';
import { AppContext } from "@/../script/state/context/AppContext";
import AlertContainer from '../organism/ims/items/atoms/common/AlertContainer';
import ScreenContainer from '../organism/ims/items/atoms/common/ScreenContainer';
import { useNavigationEvent } from '../../../script/util/hook/useNavigationEvent';

function Component({
    session,
  children,
}: {
    session: any,
  children: React.ReactElement
}) {

  const searchParams:any = useSearchParams();
  const queryClient = new QueryClient()
  const [filters,s__filters] = useState({})
  const [alertMap,alertMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
  const [sidebarLinks,s__sidebarLinks] = useState([])
  const [sidebarPages,s__sidebarPages] = useState([])
  const [_session,s__session] = useState([])



  const alertNotification = (category="neutral", msg="")=>{
  alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
      setTimeout(()=>{alertMap__do.set(category, msg)},100)
  }



  let appValue:any = useMemo(()=>{
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
      online: searchParams.offline == undefined,
      query: searchParams,
      filters,s__filters,unfilter:(key:any)=>{
          let newObj:any = {...filters}
          delete newObj[key]
          s__filters(newObj)
      },
      sidebarLinks,s__sidebarLinks,
      sidebarPages,s__sidebarPages,
      session,s__session,
      alertMap,alertMap__do,
      alertReset:()=>{alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
      alert:(category:any, msg:any)=>{ alertNotification(category, msg) }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[alertMap, filters, searchParams,sidebarLinks, sidebarPages])
  
  useNavigationEvent(
    ()=>{
      // alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
      // alertNotification("wait", "Loading please wait...")
    console.log("loaded page")
  },
    () => ()=>{
      // alertNotification("wait", "Loading please wait...")
      // alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
      console.log("navigated")
  });
  
  // useEffect(()=>{
  //   console.log("im here")
  // },[])
  const router:any = useRouter()

  // useEffect(() => {

  //   const handleRouteChange = (url:any, { shallow }:any) => {
  //     console.log(
  //       `App is changing to ${url} ${
  //         shallow ? 'with' : 'without'
  //       } shallow routing`
  //     )
  //     // document.getElementById("spinner").style.display = "block"; 
  //     return;
  //   }; 
    
  //   const handleRouteComplete = (url:any, { shallow }:any) => {
  //         console.log('you have finished going to the new page')
  //         // document.getElementById("spinner").style.display = "none";
  //         return;
  //   }; 
    
  //   router.events.on('routeChangeStart', handleRouteChange)
  //   router.events.on('routeChangeComplete', handleRouteComplete)// If the component is unmounted, unsubscribe
        
  //   // from the event with the `off` method:
  //       return () => {
  //         router.events.off('routeChangeStart', handleRouteChange)
  //       }
  //     }, [])
  
//  useEffect(() => {
//         // on initial load - run auth check 
//         // authCheck(router.asPath);

//         // on route change start - hide page content by setting authorized to false  
//         const hideContent = () => {
//           console.log("routeChangeStart")

//         }
//         router.events.on('routeChangeStart', hideContent);

//         // on route change complete - run auth check 
//         router.events.on('routeChangeComplete', () => {
//           console.log("routeChangeComplete")
//         })

//         // unsubscribe from events in useEffect return function
//         return () => {
//             router.events.off('routeChangeStart', hideContent);
//             router.events.off('routeChangeComplete', ()=>{
//               console.log("routeChangeComplete")
//             });
//         }
//     }, []);

  return (
    <AuthProvider {...{session}}>
      <AppContext.Provider value={appValue}>
      
        <QueryClientProvider client={queryClient}>
          {children}        
          <div>
            <AlertContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} 
            />
            <AlertContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("success", val)), msg:alertMap.get("success")}}
                badgeClass="ims-badge-success"
            />
            <AlertContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("warn", val)), msg:alertMap.get("warn")}}
                badgeClass="ims-badge-secondary" 
            />
            <AlertContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("error", val)), msg:alertMap.get("error")}}
                badgeClass="ims-badge-error" 
            />
            {/* <ScreenContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("wait", val)), msg:alertMap.get("wait")}}
                badgeClass="" 
            /> */}
            {/* <ScreenSaver /> */}
          </div>
        </QueryClientProvider>
      </AppContext.Provider>
    </AuthProvider>
  )
}

export default Component;