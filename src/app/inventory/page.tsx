import { fetchSession } from '@/../script/state/repository/session';
import Sidebar from '@/dom/template/Sidebar';
import UnitsTable from '@/dom/atom/UnitsTable';
import SidebarLinks from '@/dom/template/SidebarLinks';
import { fetchUnits } from '@/../script/state/repository/unit';
import { BreadCrumbs } from '@/dom/atom/BreadCrumbs';
import { fetchUnitForeigns, fetchUnitPageData } from '../../../script/util/helper/fetchHelper';
import ScreenContainer from '@/dom/organism/ims/items/atoms/common/ScreenContainer';

export default async function Home() {
  const theArray = await fetchUnits({cache: "no-store"})  
  const session:any = await fetchSession() 
  // const q_foreigns = await fetchUnitForeigns()

  
  return (<>
    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={session.user} >
            <SidebarLinks links={[
              {label:"Agreements", icon:"agreements", iconClass:"tx-lg",url:"/agreements"},
              {label:"Add Unit", icon:"unit", iconClass:"tx-lg", url:"/unit/add"},
              {label:"Users", icon:"users", iconClass:"tx-lg", url:"/users"},
            ]} />
          </Sidebar>
        </div>
        <div className=' flex   '>
          <div className='w-min-300px invisible block'/>
          <div className='flex-1 flex-col  flex-align-start px-8 Q_xs_px-2 pt-'>

            <BreadCrumbs pages={[["/inventory","Inventory"]]} />

            <div > <h1 className='tx-bold-3 mt-6'>Inventory</h1> </div>
            <hr className='opaci-10 w-100 mb-4 my-2' />

            <UnitsTable initialArray={theArray} q_foreigns={null} />
              
        
          </div>
        </div>
      </div>
      <div className='py-8 tx-center  w-100 opaci-10'>
        <h1>License | Copyright © 2023 WebGame</h1>
      </div>
    </main>
    
    <ScreenContainer 
          badgeClass="" 
      />
  </>)
}