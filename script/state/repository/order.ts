import crypto from 'crypto';
import https from 'https';


import { getSupabaseClient } from '@/../script/state/repository/supabase';
import { fetchPlayer, fetchPostPlayer, fetchPutPlayer, fetchSameIPCount, fetchSamePlayerCount } from '@/../script/state/repository/player';
// import { fetchPostOrder } from '@/../script/state/repository/order';

export const generalLookupTable: { [key: string]: number } = {
  'BTC': 2,
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
export const qtyLookupTable: { [key: string]: number } = {
  'BTCUSDT': 3,
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
export const priceLookupTable: { [key: string]: number } = {
  'BTCUSDT': 1,
  'ETHUSDT': 5,
  'BNBUSDT': 4,
  'USDTUSDT': 4,
  'ADAUSDT': 4,
  'DOGEUSDT': 8,
  'XRPUSDT': 4,
  'DOTUSDT': 4,
  'UNIUSDT': 4,
  'SOLUSDT': 4,
};
export function computeHash (firstValue:any, secondValue:any) {
  
  const hash = crypto.createHash('sha256');
  // console.log("hash values", firstValue, secondValue)
  hash.update(firstValue);
  hash.update(secondValue);
  const hash_digest = hash.digest('hex');
  // console.log("hash_digest", hash_digest)

  return hash_digest
}

type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

export function adjustOrderParams({ side, symbol, quantity, price }: LimitOrderParams): { quantity: number; price: number } {  
  const pricedecimalPlaces = priceLookupTable[symbol.toUpperCase()] || 2;
  const adjustedQuantity = parseQuantity(symbol.toUpperCase(),quantity/price);
  const adjustedPrice = Number((parseFloat(`${price}`)).toFixed(pricedecimalPlaces));

  return { quantity: adjustedQuantity, price: adjustedPrice };
}

export function parseQuantity(symbol: string, quantity: number): number {
  const qtydecimalPlaces = qtyLookupTable[symbol] || 2;
  return Number(parseFloat(`${quantity}`).toFixed(qtydecimalPlaces));
}

export async function sendTelegramMessageVirtualOrder(req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "user") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;
    ipAddress = ipAddress.match(ipAddressRegex)[0]

    const hash = crypto.createHash('sha256');
    hash.update(ipAddress);
    hash.update(apiSecret);
    const new_uid = hash.digest('hex');

    const message = `📈 Demo API Key @${chatId} | 🔑 ${token} \n\n👤 User ID: ${new_uid}\n\n💰 Placed an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;    
    let sendmesres = await fetch(url)
    callback(await sendmesres.json());
  }
}


export function getCryptoPriceDecimals(symbol: string): number {
  return generalLookupTable[symbol] || 2;
}
export function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }:any, apiKey: string, apiSecret: string, callback: Function) {
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
  let _price = !!price ? price.toFixed(getCryptoPriceDecimals(symbol)) : 0
  if (!_price) {
    console.log("bad price: ", _price)
    return null
  }
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';
    res.on('data', (data) => { result += data; });
    res.on('end', () => { callback(JSON.parse(result)); });
  });
  req.on('error', (err) => { callback(err); });
  req.write(data);
  req.end();
}

export async function fetchPostOrder(supabase:any, orderObj:any) {
  const { data: order, error:error2 } = await supabase
    .from('order')
    .insert(orderObj)
    .single()
  // if (!!error2) {
  //   console.log("error2", error2)
  // }
  return !error2
}

export async function sendSupabaseVirtualOrder(
  req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const new_uid = computeHash(apiKey, apiSecret)
  let playerObj:any = {
    name: apiKey,
    ipv4: ipAddress,
    hash: new_uid,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades:"",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, new_uid)
  if (!count) {
    let addRes = await fetchPostPlayer(supabase,playerObj)
    if (!addRes) { throw new Error() }
  } else {
    playerObj = await fetchPlayer(supabase,new_uid)
  }
  let orderObj:any = {
    symbol: symbol,
    price: price,
    qty: quantity,
    isBuyer: side.toLowerCase() == "buy",
    trigger: price,
    startHash: new_uid,
    datenow: Date.now(),
  }
  
  let attempts = playerObj.attempts
  const ipcount = await fetchSameIPCount(supabase, ipAddress)
  if (Number(ipcount) > 5) { throw new Error() }
  if (!!attempts) {
    let playerRes = await fetchPutPlayer(supabase,playerObj, new_uid, orderObj)
    let orderRes = await fetchPostOrder(supabase,orderObj)
    if (!orderRes) { throw new Error() }
  } else {
    throw new Error()
  }
  return new Response(JSON.stringify(orderObj))
}
  

export async function getSupabasePlayer(
  req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const new_uid = computeHash(apiKey, apiSecret)
  // console.log("new_uid", new_uid)
  let playerObj:any = {
    name: apiKey,
    ipv4: ipAddress,
    hash: new_uid,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades:"",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, new_uid)
  if (!count) {
    throw new Error()
  } else {
    playerObj = await fetchPlayer(supabase,new_uid)
  }
  
  return new Response(JSON.stringify(playerObj))
}