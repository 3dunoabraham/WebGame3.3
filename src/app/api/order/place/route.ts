import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/../script/state/repository/supabase';

type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

function getCryptoPriceDecimals(symbol: string): number {
  const lookupTable: { [key: string]: number } = {
    'BTC': 5,
    'ETH': 5,
    'BNB': 4,
    'USDT': 4,
    'ADA': 4,
    'DOGE': 8,
    'XRP': 4,
    'DOT': 4,
    'UNI': 4,
    'SOL': 4
  };
  return lookupTable[symbol] || 2;
}
async function sendSupabaseVirtualOrder(req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function) {

  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;
  ipAddress = ipAddress.match(ipAddressRegex)[0]

  // Hash IP address to create a unique user ID
  const hash = crypto.createHash('sha256');
  hash.update(ipAddress);
  console.log("ipAddress", ipAddress)
  hash.update(apiSecret);
  const new_uid = hash.digest('hex');


  
  let asdasd:any = {
    name: "someone",
    ipv4: ipAddress,
    hash: new_uid,
    attempts: 3,
    datenow: Date.now(),
  }

  const supabase = getSupabaseClient()
    console.log("getting user by hash ", new_uid)
    const { data: existingStart, error: selectError } = await supabase
  .from<any, any>('start')
  .select('*')
  .match({ hash: new_uid })
  .single()

  if (!existingStart) {
    console.log("user start not found")

    const { data: start, error } = await supabase
              .from('start')
              .insert(asdasd)
              .single()
            if (error) {
              throw error
            }

    // throw new Error
    // return
  } else {
    asdasd = existingStart
  }
  let orderObj:any = {
    symbol: symbol,
    price: price,
    trigger: price,
    startHash: new_uid,
    datenow: Date.now(),
  }
  
  let attempts = asdasd.attempts
    console.log("user attempts...",new_uid, asdasd.attempts)
    if (!!attempts) {
    const { data: order, error:error2 } = await supabase
              .from<any, any>('order')
              .insert(orderObj)
              .single()
      if (error2) {
      console.log("error 2")
      throw error2
    }
    console.log("order request...",order)
  }

  // // Construct message
  // const message = `📈 Demo API Key @${chatId} | 🔑 ${token} \n\n👤 User ID: ${new_uid}\n\n💰 Placed an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
  // // console.log("sending message ", message)
  // // Send message to Telegram
  // const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  
  // let sendmesres = await fetch(url)
  // // console.log("sendmesres status",sendmesres.status)
  // // Invoke the callback function
  
  // callback(await sendmesres.json());

}
async function sendTelegramMessageVirtualOrder(req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "demo") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    // Get user's IP address
    let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;
    ipAddress = ipAddress.match(ipAddressRegex)[0]

    // Hash IP address to create a unique user ID
    const hash = crypto.createHash('sha256');
    hash.update(ipAddress);
    console.log("ipAddress", ipAddress)
    hash.update(apiSecret);
    const new_uid = hash.digest('hex');

    // Construct message
    const message = `📈 Demo API Key @${chatId} | 🔑 ${token} \n\n👤 User ID: ${new_uid}\n\n💰 Placed an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
    // console.log("sending message ", message)
    // Send message to Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    let sendmesres = await fetch(url)
    // console.log("sendmesres status",sendmesres.status)
    // Invoke the callback function
    callback(await sendmesres.json());

  }
}

function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }:any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "demo") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    const message = `Demo API Key @${chatId} | w${token} \n\n\n\n  used to place an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
    // console.log("demo mesage ", message)
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
    https.get(url);
    callback(false);
    return;
  }

  const options: https.RequestOptions = {
    hostname: 'api.binance.com',
    port: 443,
    path: '/api/v3/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };
  let _price = price.toFixed(getCryptoPriceDecimals(symbol))
  // console.log(price,"->",_price)
  // console.log("quantity",quantity)
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';

    res.on('data', (data) => {
      result += data;
    });

    res.on('end', () => {
      callback(JSON.parse(result));
    });
  });

  req.on('error', (err) => {
    // console.log("error place order",err)
    callback(false);
  });

  req.write(data);
  req.end();
}

const env_BINANCE_PUBLIC = process.env.BINANCE_PUBLIC
const env_BINANCE_SECRET = process.env.BINANCE_SECRET

// function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Set your Binance API key and secret here
// //   const apiKey = 'YOUR_API_KEY';
// //   const apiSecret = 'YOUR_API_SECRET';
  
//     const apiKey:any = env_BINANCE_PUBLIC
//     const apiSecret:any = env_BINANCE_SECRET

//   // Retrieve the parameters from the request body
//   const { side, symbol, quantity:_quantity, price:_price } = req.body;
//   console.log("req body", { side, symbol, quantity:_quantity, price:_price })
//   const { quantity, price } = adjustOrderParams(req.body);
//   // Call the makeLimitOrder function with the retrieved parameters
//   console.log("makelimitorder", { side, symbol, quantity, price })
//   makeLimitOrder(
//     { side, symbol, quantity, price },
//     apiKey,
//     apiSecret,
//     (result: any) => {
//       res.status(200).json(result);
//     }
//   );
// }

  function adjustOrderParams({ side, symbol, quantity, price }: LimitOrderParams): { quantity: number; price: number } {
    const lookupTable: { [key: string]: number } = {
      BTC: 5,
      ETH: 5,
      BNB: 4,
      USDT: 4,
      ADA: 4,
      DOGE: 8,
      XRP: 4,
      DOT: 4,
      UNI: 4,
      SOL: 4,
    };
  
    const decimalPlaces = lookupTable[symbol] || 2;
    const adjustedQuantity = parseQuantity(symbol.toUpperCase(),quantity);
    const adjustedPrice = Number(price.toFixed(decimalPlaces));
  
    return { quantity: adjustedQuantity, price: adjustedPrice };
  }
  
function parseQuantity(symbol: string, quantity: number): number {
    // console.log("parseQuantity", symbol, quantity)
    const lookupTable: { [key: string]: number } = {
      'BTCUSDT': 5,
      'ETHUSDT': 4,
      'BNBUSDT': 4,
      'USDTUSDT': 4,
      'ADAUSDT': 4,
      'DOGEUSDT': 8,
      'XRPUSDT': 4,
      'DOTUSDT': 4,
      'UNIUSDT': 4,
      'SOLUSDT': 4
    };
    const decimalPlaces = lookupTable[symbol] || 2;
    return Number(parseFloat(`${quantity}`).toFixed(decimalPlaces));
  }


  
export async function POST(request: any) {
  const body:any = await request.json()
  // Retrieve the parameters from the request body
  const { side, symbol, quantity:_quantity, price:_price,apiKey,apiSecret } = body;
  const { quantity, price } = adjustOrderParams(body);
  // console.log("apiKey", apiKey)
  if (apiKey == "demo") {
    if (request.headers && 'x-forwarded-for' in request.headers ) {
      // console.log("headers", request.headers['x-forwarded-for'])
    } else {
      // console.log("no x-forwarded-for in headers", )
      if (!!request.socket){
      // console.log("socket", request.socket)
        
      } else {
        // console.log("no socket", "request empty")
        // console.log("asking 'x-real-ip'", request.headers.get('x-real-ip'))
        // console.log("asking 'x-forwarded-for'", request.headers.get('x-forwarded-for'))
      }
    }
    // console.log("socket", request.sock)
    // console.log("secret", apiSecret)

    


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
    sendSupabaseVirtualOrder(request,
      { side, symbol, quantity, price },
      apiKey,
      apiSecret,
      (callbackRes: any) => {
        // console.log("finally sendTelegramMessageVirtualOrder resulttt?", callbackRes)
        if (!callbackRes) {
          throw Error
        }
      }
    )






    return new Response()
    // throw new Error
  }

  console.log("req body", { side, symbol, quantity:_quantity, price:_price })
  // Call the makeLimitOrder function with the retrieved parameters
  console.log("makelimitorder", { side, symbol, quantity, price })
  makeLimitOrder(
    { side, symbol, quantity, price },
    apiKey,
    apiSecret,
    (result: any) => {
      console.log("resulttt?", result)
      if (!result) {
        throw Error
      }
    }
  );

    const fullRes = new Response(JSON.stringify({message:"success"}));
  
    return fullRes
  }
  
  