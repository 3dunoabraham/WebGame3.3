import { computeHash } from "./order"
import { fetchPlayer, fetchPostPlayer, fetchSamePlayerCount } from "./player"
import { getSupabaseClient } from "./supabase"


export async function fetchLogin(req: any, referral: string, pin: string, ) {
  const playerHash = computeHash(referral, pin)
  let playerObj:any = {}
  const supabase = getSupabaseClient()
  const player = await fetchSamePlayerCount(supabase, playerHash)
  if (!player) { throw new Error("No player found")}

  playerObj = await fetchPlayer(supabase,playerHash)

  return new Response(JSON.stringify(playerObj))
}