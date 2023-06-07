
import { getSupabasePlayer, sendSupabaseGoodAttempt } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { apiKey,apiSecret } = body;
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

  return rrreeesss
}
  
  