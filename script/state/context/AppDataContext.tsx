"use client";
import React, { createContext, FC, useContext, useEffect, useState } from "react";


export const AppData = createContext<IAppDataContext | null>(null);

const AppDataProvider:any = (props:any) => {
  const { session: session, children } = props;
  
  useEffect(() => {
    const intervalId = setInterval(async ()=>{
    }, 123450);
    return () => clearInterval(intervalId);
  }, []);

  const asd = () => {

  }
  return (
    <AppData.Provider value={{asd}}>
      {children}
    </AppData.Provider>
  );
};

export const useAppData = () => useContext(AppData) as IAppDataContext;

export default AppDataProvider;

export interface ILoginForm {
  referral?: string;
  pin?: string;
}
export interface IUser {
  referral: string;
  name: string;
}

interface IAppDataContext {
}
