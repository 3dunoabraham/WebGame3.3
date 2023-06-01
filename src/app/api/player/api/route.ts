
import { setSupabasePlayerAPIKeys, getSupabasePlayer, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { apiKey,apiSecret, binancePublic, binanceSecret } = body;
  // console.log("getting player, ", apiKey, apiSecret)
  //   const { quantity, price } = adjustOrderParams(body);
  if (apiKey == "user" && apiSecret == "0000") {
    return new Response()
  }

  let _player:any = await setSupabasePlayerAPIKeys(request,apiKey, apiSecret,binancePublic,binanceSecret)


  // binancePublic, binanceSecret

  // console.log("creds, ", apiKey, apiSecret)
  // let _player:any = await getSupabasePlayer(request,{},apiKey, apiSecret,()=>{})
  // console.log("some resssssssssssss, ",)
  let player:any = await _player.json()
  // console.log("playerzzzzzzzzz, ",)

  return new Response(JSON.stringify(player))
}
  
  