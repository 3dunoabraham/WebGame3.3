import { fetchUser } from '@/../script/state/repository/auth';
import { Ticker, fetchTicker } from '@/../script/state/repository/ticker'
// import Level2 from '@/model/level/level2';
import { fetchSession, getJWTCookie } from '@/../script/state/repository/session';
import Level2 from '@/model/level/level2';
import LoginForm from '@/model/overlay/LoginForm';
import LogoutForm from '@/model/overlay/LogoutForm';
import { Suspense } from 'react';
import Image from 'next/image';
import DevelopmentRegister from '@/dom/atom/holders/DevelopmentRegister';
import DevelopmentProfile from '@/dom/atom/holders/DevelopmentProfile';
import Head from 'next/head';

export default async function Page() {  
  const foundJWT:any = await getJWTCookie()
  const foundUser = await fetchSession()
  // console.log("foundUser", foundUser)
  // const foundUser:any = !!foundJWT ? await fetchUser(foundJWT) : null
  const LOCAL_TICKER_SYMBOLS:any = ["BTCUSDT","ETHUSDT"]
  const tickers: Ticker[] = await Promise.all(
    LOCAL_TICKER_SYMBOLS.map((aTicker:any)=>(fetchTicker(aTicker)))
  );

  return (<>
    {/* <a href="/dashboard" rel="noopener noreferrer"
      className='pos-abs bottom-0 right-0 pt-0 Q_xs_px-3 mt-3 pa-8 z-800 block tx-black tx-lg tx-ls-3 opaci-chov--50 tx-bold-2 nodeco '
    >
      Dashboard
    </a> */}
    {/* <Head>
      <link rel="icon" href="./favicon2.ico" type="image/x-icon"  sizes="any" />
    </Head> */}

    <main className='flex-col px-3 pos-rel' style={{background: "linear-gradient(0deg, #000000, #333333)"}}>
      <div className='  h-min-90vh pos-rel w-100 '>      
        
        <div className='flex '>
          <a href="/" rel="noopener noreferrer" className='nodeco  w-min-80px z-800 pos-rel pt-3 ' >
            <h1 className='tx-center flex-col tx-bold-2 tx-white bg-black py-2 z-800 pos-rel bord-r-5 box-shadow-5-b '>
              {/* <span className='tx-sm tx-bold-8 tx-ls-4 opaci-50' title='Gamified Trading App'>G T A</span> */}
              <span className='tx-lg'><b>B</b>yte</span>
              <span className='tx-lgx'><b>C</b>ity</span>
            </h1>
          </a>
        </div>
        {/* qwesdf */}
        
          {!foundJWT && <>
            <div className='pos-abs top-0 right-0 pt-3'>
              <LoginForm />
            </div>
          </>}
          {!!foundJWT && !!foundUser.user && <>
            <div className='pos-abs top-0 right-0 pt-3'>
              {/* <div className='flex-col tx-lx opaci-10 py-'>{foundUser.user.name} <small>(Verified)</small></div> */}
              <LogoutForm />
            </div>
          </>}

      </div>
      {/* style={{filter: "saturate(1.3)"}} */}
      <div className='pos-abs top-0 w-100 h-100' >
        {/* <div className='pt-8 flex-col'><img src="/images/landing.jpg" alt="" /></div> */}
        <Suspense>
          <Level2 />
        </Suspense>
        {!foundJWT && 
          <DevelopmentRegister />
        }
        {!!foundJWT && 
          <DevelopmentProfile />
        }
      </div>
    </main>
  </>)
}