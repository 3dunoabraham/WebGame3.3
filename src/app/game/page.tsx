import Image from 'next/image'
import { fetchUser } from '@/../script/state/repository/auth';
import { TICKER_SYMBOLS, Ticker, fetchTicker } from '@/../script/state/repository/ticker'
import Scene from '@/model/core/Scene';
import Head from 'next/head';
import Level1 from '@/model/level/level1';
import { getJWTCookie } from '../../../script/state/repository/session';
import TickerCard from '@/model/extra/TickerCard';
import LoginForm from '@/dom/cell/form/LoginForm';


export default async function Home() {
  
  const foundJWT:any = await getJWTCookie()
  const foundUser:any = !!foundJWT ? (
    foundJWT.length > 42 ? await fetchUser(foundJWT) : {
      email:"example@example.com",
      name: "joe",
    }
  ) : null
  const LOCAL_TICKER_SYMBOLS:any = ["BTCUSDT","ETHUSDT"]
  const tickers: Ticker[] = await Promise.all(
    LOCAL_TICKER_SYMBOLS.map((aTicker:any)=>(fetchTicker(aTicker)))
  );  
  const tickerCards = LOCAL_TICKER_SYMBOLS.map((tickerName:any, index:number) => (
    <TickerCard initialTicker={tickers[index]} tickerName={tickerName} key={tickerName} />
  )); 

  return (<>
    <main className='flex-col px-3 pos-rel' style={{background: "linear-gradient(165deg, #D6DBDC, #ffffff)"}}>
      <div className='  h-min-100vh pos-rel w-100 '>
      {/* w-max-1080px  pos-rel */}

      <div className='pos-abs top-0 left-0 pt-4 '>
        {tickerCards}
      </div>
      
      <a href="/dashboard" rel="noopener noreferrer"
        className='pos-abs bottom-0 right-0 Q_xs_px-3 mt-3 pa-8 z-800 block tx-black tx-lg tx-ls-3 opaci-chov--50 tx-bold-2 nodeco '
      >
        Dashboard
      </a>
      <div className='flex-col'>
        <a href="/game" rel="noopener noreferrer" className='nodeco  w-min-80px z-800 pos-rel pt-4' >
          <h1 className='tx-center flex-col tx-bold-2 tx-white bg-black py-2 z-800 pos-rel bord-r-5 box-shadow-5-b '>
            <span className='tx-'><b>W</b>eb</span>
            <span className='tx-lg'><b>G</b>ame</span>
          </h1>
        </a>
      </div>
      <div className='pos-abs top-0 right-0 pt-3'>
        {!foundUser && <LoginForm />}
        {foundUser && <>
          <div className='flex-col tx-lx opaci-10 py-8'>Welcome Back!</div>
        </>}
      </div>
      
    </div>
        
    <div className='pos-abs top-0 w-100 h-100'>
      <Level1 />
    </div>

    </main>
  </>)
}
