
import { setSupabasePlayerAPIKeys } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { apiKey,apiSecret, binancePublic, binanceSecret } = body;

  let result:any = await setSupabasePlayerAPIKeys(request,apiKey, apiSecret,binancePublic,binanceSecret)

  return new Response(result)
}
  
  