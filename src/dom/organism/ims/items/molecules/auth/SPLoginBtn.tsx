"use client";

import { BsBoxArrowInRight, BsDoorClosed, BsBoxArrowInDown, BsBoxArrowRight } from "react-icons/bs";
import authService from '@/scripts/state/services/auth'
import nookies, { serialize, parse } from 'cookie'
import { setCookie } from 'nookies'
import { AppContext } from "@/../script/state/context/AppContext";
import { useContext } from 'react'
import { fetchDelete } from "@/../script/util/helper/fetchHelper";

export default function Component({ children }) {
    const app = useContext(AppContext)
    const SP_signIn = () => {
        let email = prompt("Email?")
        if (!email) return
        let password = prompt("Password?")
        if (!email || !password) return

        alert("sign in")
        submitLogin(email, password)
    }

  const signOut = async () => {
    let api_url = "https://apidev.servicepad.com"
    let res = await fetch(api_url + '/auth/logout/', {
        method: "DELETE",
        headers: {
            Authorization: 'Bearer ' + app.session,
          },
      })
    if (!res) 
    {
        console.log("failed logout", res)
        return
    }
    let res2 = await res.json()
    console.log("res2")

      

  }
  const submitLogin = async (email, password) => {
    let credentials = {
        email,
        password,
    }
    
    let res = await authService.login(credentials)
    let { data } = await res.json()

    if (data) {
        console.log("data", data.jwt)
        setCookie(null, 'session', data.jwt, { path: '/' })

      }
    
  }


    if (!!app.session)
    {
        return (
            <div className="flex Q_xs_md_flex-col">
                <div className="flex-1">
                    {children}
                </div>
                <button className="pa-1 pt-2 tx-lgx tx-white  opaci-chov--50" onClick={() => signOut()}>
                    <BsBoxArrowRight />
                </button>
            </div>
        );
    }
    return (
    <button className="w-100 tx-mdl nowrap  bg-w-10 pa-2 tx-white bord-r-8 opaci-chov--50"
        onClick={() => SP_signIn()}
        // onClick={() => signIn()}
    >
        <div className="Q_lg_x">Sign in</div>
        <div className="Q_xs_lg"><BsBoxArrowInRight /></div>
    </button>
    );
}
