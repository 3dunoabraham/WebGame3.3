import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { GetServerSidePropsContext } from 'next';


import { JWTNAME, fetchUser } from '@/../script/state/repository/auth';

export async function middleware(req: NextRequest, context: GetServerSidePropsContext) {
  let sessiontoken = req.cookies.get(JWTNAME)?.value;
  if (!sessiontoken) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    url.search = ""
    return NextResponse.redirect(url)
  }
  
  const userResponse = await fetchUser(sessiontoken)

  let userdata = userResponse
  if (!userdata) {        
    const url:any = req.nextUrl.clone()
    url.pathname = "/"
    url.search = ""
    if (!!url.headers) { url.headers.set("Set-Cookie", JWTNAME + `; Max-Age=0`) }
    
    return NextResponse.redirect(url)
  }
  // else { console.log("found user data", userdata.email) }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/unit/add', '/unit/:path*', '/inventory'
  ],
}