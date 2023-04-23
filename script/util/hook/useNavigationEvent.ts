"use client";

import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../state/context/AppContext";

export const useNavigationEvent = (onStart: () => void, onPathnameChange: () => void) => {
  // const app:any = useContext(AppContext)
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    console.log("navigating...", )
      onStart();
      // app.alert("wait","Loading please wait")

    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      // Update REF
      savedPathNameRef.current = pathname;
       console.log("Updated REF pathname", )
      //  app.alertReset()
  }
  }, [pathname, onPathnameChange]);
};