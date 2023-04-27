"use client";

import Link from "next/link";
import { BsBox, BsHouse, BsStack, BsPeople } from 'react-icons/bs'
import dynamic from "next/dynamic";
import { useState } from "react";

function Component ({ links } : any) {

  const IconSwitch:any = {
    home: <BsHouse />,
    agreements: <BsStack />,
    users: <BsPeople />,
    unit: <BsBox />,
  }
  const [loading, s__loading] = useState()

  return (
    <div className='flex-col flex-align-stretch   w-100 '>
      {links.map((aLink:any, index:any) => {
        return (
          <Link key={index} className='nodeco  bg-w-hov-50 px-2 py-3 block tx-white gap-2 flex '
            onClick={()=>{s__loading(aLink.label)}}
            href={aLink.url}
          >
            <div className='px-2 flex'>
              {aLink.label == loading && <div className="spin-1">-</div>}
              <div className={`px-2 ${aLink.iconClass}`}>{IconSwitch[aLink.icon]}</div>
              <div className="Q_lg_x">{aLink.label}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Component