import { fetchSession } from '@/../script/state/repository/session';
import { BreadCrumbs } from '@/dom/atom/BreadCrumbs';
import Sidebar from '@/dom/template/Sidebar';
import SidebarLinks from '@/dom/template/SidebarLinks';
// import { DEFAULT_UNIT } from '@/../script/constant/json/unit';
import UnitAddComponent from '@/dom/organism/ims/partials/unit/UnitAddComponent';
import { useBools } from '@/../script/util/hook/useBools';
import UnitTopForm from '@/dom/organism/ims/partials/unit/TopForm';
import { DEFAULT_UNIT } from '../../../../script/constant/unit';
import { fetchUnitPageData } from '../../../../script/util/helper/fetchHelper';

export default async function Home() {
  const session:any = await fetchSession() 
  const q_foreigns = await fetchUnitPageData()
  return (
    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>        
            
        <UnitAddComponent unit={DEFAULT_UNIT} optMapObj={q_foreigns} />
            
      </div>
    </main>
  )
}