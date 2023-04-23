// import { AppContext } from '@/../script/state/context/AppContext';
import Link from 'next/link'
import { useContext } from 'react';


export interface BreadCrumbsProps { pages: string[][]; current?: string; }
// ReactFunctionComponent
export const BreadCrumbs = ( { pages, current }: BreadCrumbsProps)=>{
    // const app:any = useContext(AppContext)
    return (
    <div className="flex-center flex-justify-start pt-7 mt-1 tx-smd">
        <Link  href="/" className=" opaci-hov--50 py-2 pr-1 nodeco">
            <div  style={{color:"#3E5F58"}}
                className=" tx-bold-6  ">ServicePad</div>
        </Link>
        {pages.map(([pageUrl,pageTitle], index)=>(
            <div className="   clickble" key={index}>
                <span> <b className="opaci-10 tx-mdl py-2">/</b> </span>
                
                <Link href={pageUrl} className=" opaci-hov--50 pa-2 nodeco"
                    
                >
                    <span className="tx-gray tx-bold-4 ims-tx-faded">{pageTitle}</span>
                </Link>
            </div>
        ))}
        {!!current && <>
            <b className="opaci-10 tx-mdl py-2">/</b>
            <div  style={{color:"#3E5F58"}}
                className=" ims-bg-faded tx-bold-5 tx-m ml-2 pa-2 bord-r-8 bg-b-5 ">
                {current}
            </div>
        </>}
    </div>
    )
}