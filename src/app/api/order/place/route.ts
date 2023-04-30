import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/../script/state/repository/supabase';
import { fetchPlayer, fetchPostPlayer, fetchPutPlayer, fetchSameIPCount, fetchSamePlayerCount }
from '@/../script/state/repository/player';
import { fetchPostOrder, generalLookupTable, priceLookupTable, qtyLookupTable, sendSupabaseVirtualOrder }
from '@/../script/state/repository/order';

type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

function getCryptoPriceDecimals(symbol: string): number {
  return generalLookupTable[symbol] || 2;
}

async function sendTelegramMessageVirtualOrder(req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "user") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;
    ipAddress = ipAddress.match(ipAddressRegex)[0]

    const hash = crypto.createHash('sha256');
    hash.update(ipAddress);
    // console.log("ipAddress", ipAddress)
    hash.update(apiSecret);
    const new_uid = hash.digest('hex');

    const message = `📈 Demo API Key @${chatId} | 🔑 ${token} \n\n👤 User ID: ${new_uid}\n\n💰 Placed an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;    
    let sendmesres = await fetch(url)
    callback(await sendmesres.json());
  }
}

function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }:any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "user") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    const message = `Demo API Key @${chatId} | w${token} \n\n\n\n  used to place an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;    
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
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';
    res.on('data', (data) => { result += data; });
    res.on('end', () => { callback(JSON.parse(result)); });
  });
  req.on('error', (err) => { callback(false); });
  req.write(data);
  req.end();
}

function adjustOrderParams({ side, symbol, quantity, price }: LimitOrderParams): { quantity: number; price: number } {  
  const pricedecimalPlaces = priceLookupTable[symbol.toUpperCase()] || 2;
  const adjustedQuantity = parseQuantity(symbol.toUpperCase(),quantity/price);
  const adjustedPrice = Number((price).toFixed(pricedecimalPlaces));

  return { quantity: adjustedQuantity, price: adjustedPrice };
}

function parseQuantity(symbol: string, quantity: number): number {
  const qtydecimalPlaces = qtyLookupTable[symbol] || 2;
  return Number(parseFloat(`${quantity}`).toFixed(qtydecimalPlaces));
}
  
export async function POST(request: any) {
  const body:any = await request.json()
  // Retrieve the parameters from the request body
  const { side, symbol, quantity:_quantity, price:_price,apiKey,apiSecret } = body;
  const { quantity, price } = adjustOrderParams(body);
  // console.log("apiKey", apiKey)
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
  // return rrreeesss

  // console.log("req body", { side, symbol, quantity:_quantity, price:_price })
  // Call the makeLimitOrder function with the retrieved parameters
  // console.log("makelimitorder", { side, symbol, quantity, price })
  
  // console.log("(apiKey+apiSecret).length",(apiKey+apiSecret).length)
  if ((apiKey+apiSecret).length == "128") {
    // console.log("{ side, symbol, quantity, price }")
    // console.log({ side, symbol, quantity, price },)
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
    
  }

  const fullRes = new Response(JSON.stringify({message:"no success"}));
  
  return rrreeesss
}
  
  