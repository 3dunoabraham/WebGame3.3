
import { adjustOrderParams, makeLimitOrder, sendSupabaseVirtualOrder } from '@/../script/state/repository/order';
import { fetchLogin } from '@/../script/state/repository/supa';
// import jwt from 'jsonwebtoken';

export async function DELETE(request: any) {
  // console.log("check supa post")
  // const body:any = await request.json()
  // const { email,password } = body;

  // console.log("check supa login", email, password)
  // let rrreeesss = await fetchLogin(request, email, password,)
  // const resObj = await rrreeesss.json()
  // console.log("resObj", resObj)

  
  return new Response(JSON.stringify({data:{jwt:"true"}}))
}
  
  