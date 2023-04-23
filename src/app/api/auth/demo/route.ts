import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers';
import { JWTNAME } from "@/../script/state/repository/auth";

export async function GET(request: Request) {
  console.log("hello from get server")
  return new Response('login')
}
export async function POST(request: NextRequest) {

  const cookieStore = cookies();
  const oldJWTjwt = cookieStore.get(JWTNAME);
  console.log("oldJWTjwt", oldJWTjwt)

  const body:any = await request.json()
  const reqRes:any = {
    user: {
      email:"example@example.com",
      name: "joe",
    },
    jwt: `${Math.random()}${Math.random()}`
  }
  if (!reqRes) {
    console.log("no ok from server")
    return null
  }

  const fullRes = new Response(JSON.stringify(reqRes));
  fullRes.headers.append(
    'Set-Cookie', JWTNAME + '=' + reqRes.jwt + '; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=60'
  );

  return fullRes
}

