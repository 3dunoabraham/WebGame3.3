
import { adjustOrderParams, getSupabasePlayer, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
import { fetchLogin } from '@/../script/state/repository/supa';
// import jwt from 'jsonwebtoken';
import CONSTANTS from '@/../script/constant/json/api.json'

export async function POST(request: any) {
  const body:any = await request.json()
  const { email,password } = body;
  let credentials = { email,password }
  console.log("creds",email, password)
  // let rrreeesss = await fetchLogin(request, email, password,)
  // const resObj = await rrreeesss.json()
  // console.log("res", resObj)
  
  // console.log("creds, ", apiKey, apiSecret)
  let _player:any = await getSupabasePlayer(request,email, password)
  // console.log("some resssssssssssss, ",)
  let player:any = await _player.json()
  console.log("playerzzzzzzzzz, ",player)

  return new Response(player.jwt)
  // return new Response(JSON.stringify(resObj))
}
  
  