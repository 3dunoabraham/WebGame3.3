
import { getSupabasePlayer } from '@/../script/state/repository/order';

export async function POST(request: any) {
  const body:any = await request.json()
  const {  referral, pin } = body;
  
  let _player:any = await getSupabasePlayer(referral, pin)
  let player:any = await _player.json()

  return new Response(player.jwt)
}
  
  