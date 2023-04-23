"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";


import { fetchUser } from '@/../script/state/repository/auth';
import UserService from "@/../script/state/service/User";

export interface ILoginForm {
  email?: string;
  password?: string;
}
export interface IUser {
  email: string;
  name: string;
}
interface IAuthContext {
  jwt: string | undefined;
  user: IUser | undefined;
  login: (body: ILoginForm) => Promise<void>;
  demo: () => Promise<void>;
  logout: () => void;
}

export const Auth = createContext<IAuthContext | null>(null);

const AuthProvider: FC<{
  session: {
    user: IUser;
    jwt: string;
  };  
  children: any;
}> = (props) => {
  const { session: session, children } = props;
  const [user, setUser] = useState<IUser | undefined>(session.user);
  const [userInfo, s__userInfo] = useState<IUser>(session.user)

  useEffect(() => {
    if (!userInfo) return
    setUser(userInfo);
    const intervalId = setInterval(async ()=>{
      // console.log("session.jwt", session.jwt)
      let verification = await fetchUser(session.jwt)
      if (!verification) {
        console.log("verifying session")
        // logout()
      }
    }, 12345);
    return () => clearInterval(intervalId);
  }, [userInfo]);

  const demo = async () => {
    try {
      const login = await UserService.demo()
      console.log("demo login user attempt", login, )
      if (!login) {
        return null
      }
        
      s__userInfo({email:login.user.email,name:login.user.full_name,})
      return login;
    } catch (error: any) {
      console.error(error);
      return error.response;
    } finally {
      console.log("Finally Login");
    }
  }

  const login = async (body: ILoginForm) => {
    try {
      const login = await UserService.login(body)
      if (!login) {
        return null
      }
      s__userInfo({email:login.user.email,name:login.user.full_name,})
      return login;
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  };
  const logout = async () => {
    try {
      const logout = await UserService.logout()
      if (!logout) {
        return null
      }
      
      window.location.reload()
      return logout;
    } finally {
      console.log("Logout Finally");
    }
  };

  return (
    <Auth.Provider value={{ jwt: session.jwt, login, demo, logout, user, }} >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth) as IAuthContext;

export default AuthProvider;

