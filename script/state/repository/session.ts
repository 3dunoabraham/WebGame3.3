import { cookies } from "next/headers";


import { JWTNAME, USERCOOKIENAME, fetchUser } from "@/../script/state/repository/auth";

export const DEFAULT_SESSION_OBJ = {jwt:null,user:null}

export function parseJwt(token: any) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const buffer = Buffer.from(base64, 'base64');
  const json = buffer.toString('utf8');
  return JSON.parse(json);
}

export function getJWTCookie() {
  const cookieObject:any = cookies().get(JWTNAME)
  return !cookieObject ? null : ( cookieObject.value )
}

export function getUserCookie() {
  const cookieObject:any = cookies().get(USERCOOKIENAME)
  return !cookieObject ? null : JSON.parse( cookieObject.value )
}

export const fetchSession = async (isFetching:boolean = false) => {
  const foundJWT:any = getJWTCookie()
  const cookieUser:any = getUserCookie()
  if (!foundJWT) return DEFAULT_SESSION_OBJ
  let foundUser:any = isFetching ? await fetchUser(foundJWT) : cookieUser
  
  return {
    jwt: foundJWT,
    user: foundUser,
  }
}