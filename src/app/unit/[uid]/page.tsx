import { TICKER_SYMBOLS, Ticker, fetchTicker } from '@/../script/state/repository/ticker'
import TickerCard from '@/dom/atom/TickerCard'
import Sidebar from '@/dom/template/Sidebar';
import { fetchJWT } from '@/../script/state/repository/session';
import SidebarLinks from '@/dom/template/SidebarLinks';
import { fetchUser } from '@/../script/state/repository/auth';
import { fetchUnits } from '@/../script/state/repository/unit';
import { fetchUnitPageData } from '@/../script/util/helper/fetchHelper';
import UnitViewEdit from '@/dom/organism/ims/partials/unit/UnitViewEdit';

export default async function Page({ params, searchParams,}:
{
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // const searchParams:any = useSearchParams();
  const queriedUID = params?.uid
  const theArray = await fetchUnits()
  const foundJWT:any = await fetchJWT()
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

  const q_foreigns = await fetchUnitPageData()
  
  return (
    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>

        {/* this unit {queriedUID} */}

        <UnitViewEdit id={queriedUID} optMapObj={q_foreigns} />

        {/* <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={foundUser} >
            <SidebarLinks links={[{label:"Inventory",url:"/inventory"}]} />
          </Sidebar>
        </div>
        <div className=' flex px-8 Q_xs_px-2  '>
          <div className='w-min-300px invisible'> invisible sidebar spacing </div>
          <div className='flex-1 flex-col  flex-align-start  pt-4'>
            <div > <h1>Inventory</h1> </div>
            <hr className='opaci-25 w-100 mb-4 ' />

            this unit {queriedUID}



          </div>
        </div> */}
      </div>
      <div className='py-8 tx-center  w-100 opaci-10'>
        <h1>License | Copyright © 2023 WebGame</h1>
      </div>
    </main>
  )
}
