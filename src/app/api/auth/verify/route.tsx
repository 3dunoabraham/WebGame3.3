import { NextRequest, NextResponse } from "next/server"
import { JWTNAME, fetchUser } from '@/../script/state/repository/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  console.log("hello from get server")
  return new Response('login')
}
export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const oldJWTjwt = cookieStore.get(JWTNAME);
  console.log("oldJWTjwt", oldJWTjwt)

  const body:any = await request.json()
  const reqRes:any = await fetchUser(oldJWTjwt)
  if (!reqRes) {
    console.log("no ok from server")
    return null
  }

  const fullRes = new Response(JSON.stringify(reqRes));
  fullRes.headers.append(
    'Set-Cookie', JWTNAME + '=' + reqRes.jwt +
    '; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=3600'
  );

  return fullRes
}

