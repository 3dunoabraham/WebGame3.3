import { NextRequest } from "next/server"


import CONSTANTS from '@/../script/constant/json/api.json'
import { JWTNAME } from '@/../script/state/repository/auth';
import { getSupabasePlayer } from "@/../script/state/repository/order";

export async function POST(request: NextRequest) {
  const { referral, pin } = await request.json()
  
  let _player:any = await getSupabasePlayer(request, referral, pin)
  let player:any = await _player.json()

  let jwt = player.jwt
  let bodyResponse = { jwt,
    user: {
      referral,
      apiname: process.env.AUTH_API_NAME || CONSTANTS.AUTH_API_NAME,
      rolname: "root",
    },
  }
  const fullRes:any = new Response(JSON.stringify(bodyResponse), {
    status: 200,
    headers: {
      'Set-Cookie': [
        `${JWTNAME}=${jwt}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=3600`,
      ].join('; ') // Convert array to string
    }
  });
  fullRes.headers.append(
    'Set-Cookie',
    `user=${JSON.stringify(bodyResponse.user)}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=3600`
  );
    return fullRes
  
}