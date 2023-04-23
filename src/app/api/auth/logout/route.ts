import { NextRequest, NextResponse } from "next/server"
import { JWTNAME, deleteCookie, fetchLogout } from '@/../script/state/repository/auth';
import { cookies } from 'next/headers';

export async function DELETE(request: NextRequest) {
  const cookieStore = cookies();
  const oldJWTjwt:any = cookieStore.get(JWTNAME);
  console.log("oldJWTjwt delete", oldJWTjwt)
  if (!oldJWTjwt.value) return null
  // const body:any = await request.json()
  const reqRes:any = await fetchLogout(oldJWTjwt.value)
  // console.log("reqRes", reqRes)
  if (!reqRes) {
    console.log("no ok delete from server")
    return null
  }
  if (!reqRes.data) {
    console.log("no ok delete from server")
    return null
  }

  const fullRes:any = new Response(JSON.stringify({message: true}));
  // deleteCookie(request, fullRes, "jwt")
  
  // fullRes.headers.append('Set-Cookie', 'jwt=' + reqRes.jwt + '; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=60');

  return fullRes
}