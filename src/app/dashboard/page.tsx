import KLineTable from '@/model/extra/KLineTable';
import KLineChart from '@/model/extra/KLineChart';

export default async function Home() {
  const theArray = await (
    await fetch("https://api.binance.com/api/v3/klines?interval=1m&symbol=BTCUSDT")
  ).json()  

  return (
    <main className='flex-col pos-rel ddg bg-white' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' flex px-8 Q_xs_px-2 pt-8 '>
          <div className='flex-1 flex-col  flex-align-start tx-sans pt-4'>
            {!!theArray && !!theArray.length && <KLineChart initialArray={theArray} /> }
            <div > <h1>List</h1> </div>
            <hr className='opaci-25 w-100 mb-4 ' />
            <div className='tx-bold-3'>Table: isActionable, isRowLink, isDetailed</div>
            <h3 className='tx-bold-3'>Closing, Volumne, Trades</h3>
            {!!theArray && !!theArray.length && <KLineTable initialArray={theArray} /> }
          </div>
        </div>
      </div>
      <div className='py-8 tx-center  w-100 opaci-10'>
        <h1>License | Copyright © 2023 WebGame</h1>
      </div>
    </main>
  )
}
