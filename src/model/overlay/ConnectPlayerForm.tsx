"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";


import { useAuth } from "@/../script/state/context/AuthContext";
import { useBools } from "@/../script/util/hook/useBools";
import { AppContext } from "@/../script/state/context/AppContext";

const ConnectPlayerForm = ({
}: {}) => {
  const app: any = useContext(AppContext)
  const $referral: any = useRef()
  const $pin: any = useRef()
  const [LS_binanceKeys, s__LS_binanceKeys] = useLocalStorage('binanceKeys', "user:0000")
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const [loadings, t__loadings, s__loading]: any = useBools({ login: false })
  const [forms, s__forms]: any = useState({
    referral: "", pin: "", isForm: false,
  })
  const { do: { login } }: any = useAuth()
  const triggerLogin = async () => {
    s__loading("login", true)
    let parsedForms = {
      referral: forms.referral.replace(" ", ""),
      pin: forms.pin.replace(" ", ""),
    }
    if (!parsedForms.referral) return
    if (!parsedForms.pin) return

    let res = await login(parsedForms)
    if (!!res) {
      s__LS_binanceKeys(`${forms.referral}:${forms.pin}`);

      const founduserRes = await fetch("/api/player/verify", {
        method: "POST",
        body: JSON.stringify({
          referral: forms.referral.replace(" ", ""),
          pin: forms.pin.replace(" ", "")
        })
      })
      if (founduserRes.status >= 400) throw new Error()
      let theplayer = await founduserRes.json()
      if (!theplayer) return window.location.reload()

      if (theplayer.goodAttempts > 0) {
        s__LS_tutoStage(JSON.stringify({ lvl: 4 }))
      }

      window.location.reload()
      return
    }
    s__loading("login", false)
    app.alert("error", "Failed login. Try again")
  }
  const triggerIsForm = async () => {
    s__forms({ ...forms, ...{ isForm: true } })
  }
  useEffect(() => {
    if (!$referral.current) return
    $referral.current.focus()
  }, [forms.isForm])
  const handleReferralKeyPress = (event: any) => {
    if (['Enter', 'Tab'].includes(event.key)) {
      if (!$pin.current) return
      $pin.current.focus()
    }
  }
  const handlePinKeyPress = (event: any) => {
    if (['Enter'].includes(event.key)) {
      triggerLogin()
    }
  }


  
  return (<>
    <div className='flex-col '>
      {forms.isForm &&
        <div className='flex-col flex-align-stretch gap-3 box-shadow-1-t pa-2 bord-r- mt-8 z-100 bg-white'>
          <input value={forms.referral} onChange={(e: any) => s__forms({ ...forms, ...{ referral: e.target.value } })}
            type="text" placeholder='Referral Email' ref={$referral}
            onKeyUp={handleReferralKeyPress}
            className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-md  bg-trans '
          />
          <input value={forms.pin} onChange={(e: any) => s__forms({ ...forms, ...{ pin: e.target.value } })}
            type="password" placeholder='Secret PIN' ref={$pin}
            onKeyUp={handlePinKeyPress}
            className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-md bg-trans'
          />
        </div>
      }
      {!!loadings.login && <> <div className="tx-ls-3 hover-2 pt-4 opaci-75">LOADING...</div> </>}
      {!loadings.login &&
        <div className="flex   ">
          <button className='py-1 px-7 tx-lg tx-white opaci-chov--50 mt-3 noborder bord-r-5 z-100'
            style={{ background: "#333333" }}
            onClick={forms.isForm ? triggerLogin : triggerIsForm}
          >
            Connect
          </button>
        </div>
      }
    </div>
  </>);
};

export default ConnectPlayerForm;