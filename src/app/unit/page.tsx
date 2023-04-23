import { TICKER_SYMBOLS, Ticker, fetchTicker } from '@/../script/state/repository/ticker'
import { fetchJWT } from '../../../script/state/repository/session';
import CONSTANTS from '@/../script/constant/json/api.json'
import TickerCard from '@/dom/atom/TickerCard'
import Sidebar from '@/dom/template/Sidebar';
import UnitsTable from '@/dom/atom/UnitsTable';
import SidebarLinks from '@/dom/template/SidebarLinks';
import { fetchUnits } from '@/../script/state/repository/unit';
import { fetchUser } from '@/../script/state/repository/auth';
import { BsHouse } from 'react-icons/bs';

export default async function Home() {
  const theArray = await fetchUnits()
  const foundJWT:any = await fetchJWT()
  const foundUser:any = !foundJWT ? null : (
    foundJWT.length > 42 ? await fetchUser(foundJWT) : CONSTANTS.DEMO_USER
  ) 
  
  const tickers: Ticker[] = await Promise.all(
    TICKER_SYMBOLS.map((aTicker)=>(fetchTicker(aTicker)))
  );  
  const tickerCards = TICKER_SYMBOLS.map((tickerName:any, index:number) => (
    <TickerCard initialTicker={tickers[index]} tickerName={tickerName} key={tickerName} />
  )); 

  
  return (
    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={foundUser} >
            <SidebarLinks links={[{label:"Home",icon:"agreements",iconClass:"tx-lg",url:"/"},{label:"Add Unit",url:"/unit/add"}]} />
          </Sidebar>
        </div>
        <div className=' flex px-8 Q_xs_px-2  '>
          <div className='w-min-200px invisible'> invisible sidebar spacing </div>
          <div className='flex-1 flex-col  flex-align-start  pt-4'>
            <div > <h1>Inventory</h1> </div>
            <hr className='opaci-25 w-100 mb-4 ' />

            <UnitsTable initialArray={theArray} />
              
          </div>
        </div>
      </div>
      <div className='py-8 tx-center  w-100 opaci-10'>
        <h1>License | Copyright © 2023 WebGame</h1>
      </div>
    </main>
  )
}
