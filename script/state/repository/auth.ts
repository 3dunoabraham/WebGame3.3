import { cookies } from "next/headers"
import { NextResponse } from "next/server"


import CONSTANTS from '@/../script/constant/json/api.json'

const api_url = process.env.AUTH_API_URL || CONSTANTS.AUTH_API_URL

export const JWTNAME = "session"

export async function fetchLogin (credentials:any) {
  console.log("api_url", api_url)
  try {
    const reqRes = await fetch(api_url+"/auth/login",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(credentials)
    })
    return (await reqRes.json()).data
  } catch (e:any) {
    return null
  }
}

export async function fetchLogout (jwt:any) {
  try {
    console.log("qweqwe delete ", )
    console.log(api_url+"/auth/logout",{
      method:"DELETE", headers: {
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + jwt,
      },
    })
    // return true
    
    const reqRes = await fetch(api_url+"/auth/logout",{
      method:"DELETE", headers: {
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + jwt,
      },
    })
    console.log("delete ", reqRes)
    return await reqRes.json()
  } catch (e:any) {
    return null
  }
}

export async function fetchUser (jwt:any) {
  try {
    const reqRes = await fetch(api_url+"/auth/verify",{
      headers: {
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + jwt,
      },
    })
    return (await reqRes.json()).data
  } catch (e:any) {
    return null
  }
}

export const deleteCookie = ( request: any, response: NextResponse, cookie: string ) => {
  const { value, options } = request.cookies.getWithOptions(cookie);
  if (value) {
    response.cookies.set(cookie, value, options);
    response.cookies.delete(cookie);
  }
};