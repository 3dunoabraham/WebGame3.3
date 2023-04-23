"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../script/state/context/AuthContext";
import { useRouter } from 'next/navigation';
import { useBools } from "@/../script/util/hook/useBools";

const Component = ({
}: { }) => {
  const router = useRouter()
  const $email:any = useRef()
  const [ loadings, t__loadings, s__loading ]:any = useBools({
    login: false
  })
  const [ forms, s__forms ]:any = useState({
    email:"",
    password:"",
    isForm: false,
  })
  const { user, login, logout, demo, jwt }:any = useAuth()
  const triggerDemo = async () => {
    let res = await demo()
    // console.log("res", res)
    window.location.reload()
  }
  const triggerLogin = async () => {
    s__loading("login", true)
    let res = await login(forms)
    if (!!res) { router.push("/inventory") }
    if (!res) { s__loading("login", false) }
  }
  const triggerIsForm = async () => {
    s__forms({...forms,...{isForm: true}})
  }
  useEffect(()=>{
    if (!$email.current) return
    $email.current.focus()
  },[forms.isForm])
  const triggerLogout = async () => {
    let res = await logout()
    console.log("logout res", res)
  }
  return (<>
    <div className='flex-col '>
        
        {/* <button className='py-2 px-7 tx-lgx  opaci-50 noborder opaci-chov--75 mb-3 box-shadow-2-b z-100'
            onClick={triggerDemo}
          >
            Demo ⇨ 
          </button> */}

        {forms.isForm &&
          <div className='flex-col flex-align-stretch gap-3 box-shadow-1-t pa-2 bord-r- mt-8 z-100'>
            <input value={forms.email} onChange={(e)=>s__forms({...forms,...{email:e.target.value}})}
              type="text" placeholder='Email'  ref={$email}
              className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-md  bg-trans '
            />
            <input value={forms.password} onChange={(e)=>s__forms({...forms,...{password:e.target.value}})}
              type="password" placeholder='Password' 
              className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-lg bg-trans'
            />
          </div>
        }
        {!!loadings.login && <>
          <div className="tx-ls-3 hover-2 pt-4 opaci-75">LOADING...</div>
        </>}
        {!loadings.login &&
          <div className="flex   ">
            {/* <a className='py-2 px-6 tx-lgx  opaci-75 opaci-chov--50 mt-3 noborder bg-trans tx-blue z-100'
              style={{filter:"hue-rotate(-42deg)"}}
              onClick={forms.isForm ? triggerLogin : triggerIsForm}
            >
              <div className="tx-bold-2  ">Register</div>  
            </a> */}
            {/* <span className="pt-6 tx-ls-2 opaci-25 pr-8 tx-bold-2 tx-lg">or</span> */}

            <button className='py-1 px-7 tx-lg tx-white opaci-chov--50 mt-3 noborder bord-r-5 z-100'
              style={{background:"#3E5F58"}}
              onClick={triggerLogout}
            >
              Sign out
            </button>
          </div>
        }
      </div>
  </>);
};

export default Component;