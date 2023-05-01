
import { adjustOrderParams, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { side, symbol, quantity:_quantity, price:_price,apiKey,apiSecret } = body;
  console.log("{ quantity, price } = adjustOrderParams", _quantity, _price )
  const { quantity, price } = adjustOrderParams(body);
  if (apiKey == "user" && apiSecret == "0000") {
    return new Response()
  }

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

  let rrreeesss = await sendSupabaseVirtualOrder(request,
    { side, symbol, quantity, price }, apiKey, apiSecret,
    (callbackRes: any) => { if (!callbackRes) { throw Error } }
  )
  console.log("apiKey",apiKey)
  if ((apiKey+apiSecret).length == "128") {
    console.log("{ side, symbol, quantity, price }, apiKey", { side, symbol, quantity, price }, apiKey)
    makeLimitOrder( { side, symbol, quantity, price }, apiKey, apiSecret,
      (result: any) => { console.log("resulttt?", result)
        if (!result) { throw Error }
      }
    );
  }
  
  return rrreeesss
}
  
  