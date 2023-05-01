"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";


export const useNavigationEvent = (onStart: () => void, onPathnameChange: () => void) => {
  const pathname = usePathname(); // Get current route
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    onStart();
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      savedPathNameRef.current = pathname;
    }
  }, [pathname, onPathnameChange]);
};