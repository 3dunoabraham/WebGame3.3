import { JWTNAME } from '@/../script/state/repository/auth';

export async function DELETE(request: any) {  
  return new Response(JSON.stringify({data:{jwt:"true"}}), {
    headers: { 'Set-Cookie': `${JWTNAME}=; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=0` }
  });
}
  
  