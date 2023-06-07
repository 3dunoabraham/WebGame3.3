import { computeHash } from "./order"
import { fetchPlayer, fetchPostPlayer, fetchSamePlayerCount } from "./player"
import { getSupabaseClient } from "./supabase"


export async function fetchLogin(
    req: any, apiKey: string, apiSecret: string, 
  ) {
    // Get user's IP address
    let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const playerHash = computeHash(apiKey, apiSecret)
    let playerObj:any = {
      name: apiKey,
      ipv4: ipAddress,
      hash: playerHash,
      attempts: 12,
      totalAttempts: 0,
      goodAttempts: 0,
      trades:"",
      datenow: Date.now(),
    }
    const supabase = getSupabaseClient()
    const count = await fetchSamePlayerCount(supabase, playerHash)

    if (!count) {
      throw new Error("no players found")
    } else {
      playerObj = await fetchPlayer(supabase,playerHash)
    }

    return new Response(JSON.stringify(playerObj))
  }