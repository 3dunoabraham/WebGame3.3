
import { adjustOrderParams, getSupabasePlayer, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  console.log(" api player ",   )
  const body:any = await request.json()
  const { apiKey,apiSecret } = body;
  console.log("{ apiKey,apiSecret  }", apiKey,apiSecret  )
//   const { quantity, price } = adjustOrderParams(body);
  if (apiKey == "user" && apiSecret == "0000") {
    return new Response()
  }
  let _player:any = await getSupabasePlayer(request,{},apiKey, apiSecret,()=>{})
  let player:any = await _player.json()
  console.log("player", player)


  // TELEGRAM MESSAGE DOESNT SEND IN VERCEL
  // sendTelegramMessageVirtualOrder(request,
  //   { side, symbol, quantity, price },
  //   apiKey,
  //   apiSecret,
  //   (callbackRes: any) => {
  //     // console.log("finally sendTelegramMessageVirtualOrder resulttt?", callbackRes)
  //     if (!callbackRes) {
  //       throw Error
  //     }
  //   }
  // )

//   let rrreeesss = await sendSupabaseVirtualOrder(request,
//     { side, symbol, quantity, price }, apiKey, apiSecret,
//     (callbackRes: any) => { if (!callbackRes) { throw Error } }
//   )
//   if ((apiKey+apiSecret).length == "128") {
//     makeLimitOrder( { side, symbol, quantity, price }, apiKey, apiSecret,
//       (result: any) => { console.log("resulttt?", result)
//         if (!result) { throw Error }
//       }
//     );
//   }
  
  return new Response(JSON.stringify(player))
}
  
  