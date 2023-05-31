
import { adjustOrderParams, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
import { fetchLogin } from '@/../script/state/repository/supa';
// import jwt from 'jsonwebtoken';

export async function POST(request: any) {
  const body:any = await request.json()
  const { email,password } = body;

  console.log("creds",email, password)
  let rrreeesss = await fetchLogin(request, email, password,)
  const resObj = await rrreeesss.json()
  // console.log("res", resObj)
  
  return new Response(JSON.stringify(resObj))
}
  
  