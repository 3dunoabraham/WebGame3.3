
import { adjustOrderParams, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
import { fetchLogin } from '@/../script/state/repository/supa';
// import jwt from 'jsonwebtoken';

export async function DELETE(request: any) {
  // const body:any = await request.json()
  // const { email,password } = body;

  // let rrreeesss = await fetchLogin(request, email, password,)
  // const resObj = await rrreeesss.json()

  
  return new Response(JSON.stringify({data:{jwt:"true"}}))
}
  
  