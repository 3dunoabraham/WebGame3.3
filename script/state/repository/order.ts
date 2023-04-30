import crypto from 'crypto';


import { getSupabaseClient } from '@/../script/state/repository/supabase';
import { fetchPlayer, fetchPostPlayer, fetchPutPlayer, fetchSameIPCount, fetchSamePlayerCount } from '@/../script/state/repository/player';
// import { fetchPostOrder } from '@/../script/state/repository/order';

export const qtyLookupTable: { [key: string]: number } = {
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
export const generalLookupTable: { [key: string]: number } = {
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
export const priceLookupTable: { [key: string]: number } = {
  'BTCUSDT': 5,
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
export function computeHash (ipAddress:any, apiSecret:any) {
  // Hash IP address to create a unique user ID
  const hash = crypto.createHash('sha256');
  hash.update(ipAddress);
  // console.log("ipAddress", ipAddress)

  hash.update(apiSecret);
  
  return hash.digest('hex')
}

export async function fetchPostOrder(supabase:any, orderObj:any) {
  console.log("orderObj", orderObj)
  const { data: order, error:error2 } = await supabase
    .from('order')
    .insert(orderObj)
    .single()
  if (!!error2) {
    console.log("error2", error2)
  }
  return !error2
}

export async function sendSupabaseVirtualOrder(
  req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const new_uid = computeHash(ipAddress, apiSecret)
  let playerObj:any = {
    name: apiKey,
    ipv4: ipAddress,
    hash: new_uid,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
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
    isBuyer: side.toLowerCase() == "buy",
    trigger: price,
    startHash: new_uid,
    datenow: Date.now(),
  }
  
  let attempts = playerObj.attempts
  const ipcount = await fetchSameIPCount(supabase, ipAddress)
  // console.log("ipcount, self attempts", ipcount, attempts)
  if (Number(ipcount) > 5) { throw new Error() }
  if (!!attempts) {
    let playerRes = await fetchPutPlayer(supabase,playerObj, new_uid)
    let orderRes = await fetchPostOrder(supabase,orderObj)
    if (!orderRes) { throw new Error() }
  } else {
    throw new Error()
  }
  return new Response(JSON.stringify(orderObj))
}
  