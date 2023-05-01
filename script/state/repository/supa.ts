import { computeHash } from "./order"
import { fetchPlayer, fetchPostPlayer, fetchSamePlayerCount } from "./player"
import { getSupabaseClient } from "./supabase"


export async function fetchLogin(
    req: any, apiKey: string, apiSecret: string, 
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

    return new Response(JSON.stringify(playerObj))
  }