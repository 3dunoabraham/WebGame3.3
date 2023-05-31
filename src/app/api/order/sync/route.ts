
import { adjustOrderParams, getSupabasePlayer, makeLimitOrder, sendSupabaseGoodAttempt, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { apiKey,apiSecret } = body;
  // const { quantity, price } = adjustOrderParams(body);
  if (apiKey == "user" && apiSecret == "0000") {
    return new Response()
  }

  // TELEGRAM MESSAGE DOESNT SEND IN VERCEL
  // sendTelegramMessageVirtualOrder(request,
  //   { side, symbol, quantity, price },
  //   apiKey,
  //   apiSecret,
  //   (callbackRes: any) => {
  //     if (!callbackRes) {
  //       throw Error
  //     }
  //   }
  // )
  

  let rrreeesss = await sendSupabaseGoodAttempt(request,
    apiKey, apiSecret,
  )
  if (!rrreeesss) {
    throw new Error("Coudlnt update good attempts")
  }

  let _player:any = await getSupabasePlayer(request,{},apiKey, apiSecret,()=>{})
  let theplayer:any = await _player.json()
  let theplayerBinancekeys = theplayer.binancekeys

  // console.log("theplayerBinancekeys", theplayer.binancekeys, theplayerBinancekeys)
  // console.log("theplayerBinancekeys", theplayer, theplayer.binancekeys, theplayerBinancekeys)
  // let apikeypublic = !!theplayerBinancekeys ? theplayerBinancekeys.split(":")[0] : ""
  // let apikeysecret = !!theplayerBinancekeys ? theplayerBinancekeys.split(":")[1] : ""
  // console.log("SAVED TO SUPABASE ALREADY; TRYING API KEYS NOW!!!",(apikeypublic+apikeysecret).length)


  // if ((apikeypublic+apikeysecret).length == "128") {
  //   makeLimitOrder( { side, symbol, quantity, price }, apikeypublic, apikeysecret,
  //     (result: any) => { 
  //       console.log("actually did trade thru api")
  //       if (!result) { throw Error("no result in make limit order") }
  //     }
  //   );
  // }
  
  return rrreeesss
}
  
  