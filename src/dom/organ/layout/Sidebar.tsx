import Image from 'next/image'


import LoginFormMinimal from '../../cell/form/LoginFormMinimal';
import LogoutForm from '../../cell/form/LogoutForm';

function Wrapper({children}:any) {
  return (<>
    <div className='w-min-300px h-100 flex-col Q_lg_x'> {children} </div>
    <div className='w-min-100px h-100 flex-col Q_xs_lg'> {children} </div>
  </>)
}

function Component ({ foundUser, children }:{ foundUser:any, children?:any }) {
  
  return (<>
    <Wrapper>
      <a href="/" className='py-4 flex-center '>
        <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
          <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
        </div>
        <div className='Q_lg_x pl-1'>
          <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
        </div>
      </a>
      <div className='flex-1 w-100'> {children} </div>
      <div className='pb-4'>
        {!foundUser && <LoginFormMinimal />}
        
        {foundUser && <div className='pb-8 '>
          <div className='flex-col tx-l Q_lg_x opaci-10 py-2'>{foundUser.email}</div>
          <LogoutForm />
        </div>}
      </div>
    </Wrapper>
  </>);
};

export default Component;