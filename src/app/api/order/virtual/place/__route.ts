import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';
import { getSupabaseClient } from '@/../script/state/repository/supabase';

export interface Start {
  id?: number
  name: string
  href?: string
  src?: string
  ipv4?: string
  datenow?: string
  hash?: string
  attempts?: number
  totalAttempts?: number
  goodAttempts?: number
}
const ATTEMPTS_PER_CYCLE = 3  

export const getUserHash = (req:any,apiSecret:any) => {
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

  return new_uid
}
const getElement = (body:any,new_uid:any) => {
  return  {
    symbol: body.symbol,
    price: body.price,
    trigger: body.trigger,
    startHash: new_uid,
    datenow: Date.now(),
  }
}

export async function POST(request: any, res:any) {
  const body:any = await request.json()
  const { apiKey,apiSecret } = body;
  const new_uid = getUserHash(request,apiSecret)
  const supabase:any = getSupabaseClient()
  // @ts-ignore
  const { data: existingStart, error: selectError } = await supabase
    .from<any, any>('start')
    .select('*')
    .match({ hash: new_uid })
    .single()

  if (!existingStart) {
    console.log("user start not found")
    throw new Error
    return
  }
  console.log("existingStart", existingStart)
  let attempts = existingStart.attempts
  if (!attempts) {
    let thenow = Date.now()
    let thediff = (thenow - parseInt(existingStart.datenow))
    console.log("asdasdasd", thediff / 1000 )
    if (thediff / 1000 > 60*3) // 3 minutes
    {
      attempts += ATTEMPTS_PER_CYCLE
      // @ts-ignore
      const { data: start, error } = await supabase
        .from<any, any>('start')
        .update({
          attempts: attempts,
          datenow: `${Date.now()}`,
        })
        .match({ hash: new_uid })
        .single()
    if (error) {
      throw error
    }
    // res.status(201).json(start)
    } else {
      console.log("no more attempts|dates:", existingStart.datenow, thenow)
      throw new Error
      return
    }
  }
  let asdasd = getElement(body, new_uid)
  {
    console.log("order", asdasd)
    // @ts-ignore
    const { data: order, error } = await supabase
      .from<any, any>('order')
      .insert(asdasd)
      .single()
    if (error) {
      throw error
    }
    // @ts-ignore
    const { data: start, error: error2 } = await supabase
      .from<any, any>('start')
      .update({
        attempts: attempts-1,
        totalAttempts: existingStart.totalAttempts+1,
        
      })
      .match({ hash: new_uid })
      .single()
    if (error2) {
      throw error2
    }
    res.status(201).json(order)


  }
}