import Image from 'next/image'
import { fetchUser } from '@/../script/state/repository/auth';
import { TICKER_SYMBOLS, Ticker, fetchTicker } from '@/../script/state/repository/ticker'
import { getJWTCookie } from '../../../script/state/repository/session';
import TickerCard from '@/model/extra/TickerCard';
import Sidebar from '@/dom/organ/layout/Sidebar';
import KLineTable from '@/model/extra/KLineTable';
import KLineChart from '@/model/extra/KLineChart';

export default async function Home() {

const theArray = await (
  await fetch("https://api.binance.com/api/v3/klines?interval=1m&symbol=BTCUSDT")
).json()
  
  const foundJWT:any = await getJWTCookie()
  const foundUser:any = !!foundJWT ? (
    foundJWT.length > 42 ? await fetchUser(foundJWT) : {
      email:"example@example.com",
      name: "joe",
    }
  ) : null
  
  const tickers: Ticker[] = await Promise.all(
    TICKER_SYMBOLS.map((aTicker)=>(fetchTicker(aTicker)))
  );  
  const tickerCards = TICKER_SYMBOLS.map((tickerName:any, index:number) => (
    <TickerCard initialTicker={tickers[index]} tickerName={tickerName} key={tickerName} />
  )); 

  return (
    <main className='flex-col pos-rel ddg bg-white' >
      <div className='h-min-100vh pos-rel w-100 '>


        
       {/* <div className=' pos-fix h-100vh box-shadow-2'
          style={{background: "linear-gradient(50deg, #E6EBEC, #ffffff, #E6EBEC)"}}
        > 
        <Sidebar foundUser={foundUser} />
        
      </div> */}

      <div className=' flex px-8 Q_xs_px-2 pt-8 '>
        {/* <div className='w-min-300px invisible'> invisible sidebar spacing </div> */}
        <div className='flex-1 flex-col  flex-align-start tx-sans pt-4'>
          
          {/* <div>
            <h1 className='tx-bold-3'>Tickers</h1>
            
            <div className=''>
                {tickerCards}
              </div>
          </div> */}
          
          {/* <div className='mb-8 '>
            <DashboardSummary theArray={theArray} />
          </div> */}

          {!!theArray && !!theArray.length &&
            <KLineChart initialArray={theArray} />
          }

          <div >
            <h1>List</h1>
          </div>
          <hr className='opaci-25 w-100 mb-4 ' />
          <div className='tx-bold-3'>Table: isActionable, isRowLink, isDetailed</div>
          <h3 className='tx-bold-3'>Closing, Volumne, Trades</h3>
          {!!theArray && !!theArray.length &&
            <KLineTable initialArray={theArray} />
          }

          
            
        </div>
      </div>


    </div>
    <div className='py-8 tx-center  w-100 opaci-10'>
      <h1>License | Copyright © 2023 WebGame</h1>
    </div>
    </main>
  )
}
