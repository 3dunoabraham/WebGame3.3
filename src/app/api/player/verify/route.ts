import { getSupabasePlayer } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { apiKey,apiSecret } = body;
  
  let playerRes:any = await getSupabasePlayer(request,apiKey, apiSecret)

  return new Response(playerRes)
}
  
  