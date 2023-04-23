import Link from "next/link";
import { BsBox, BsHouse, BsStack, BsPeople } from 'react-icons/bs'
import dynamic from "next/dynamic";

function Component ({ links } : any) {

  const IconSwitch:any = {
    home: <BsHouse />,
    agreements: <BsStack />,
    users: <BsPeople />,
    unit: <BsBox />,
  }

  return (
    <div className='flex-col flex-align-stretch   w-100 '>
      {links.map((aLink:any, index:any) => {
        return (
          <Link key={index} className='nodeco  bg-w-hov-50 px-2 py-3 block tx-white gap-2 flex '
            href={aLink.url}
          >
            <div className='px-2 flex'>
              <div className={`px-2 ${aLink.iconClass}`}>{IconSwitch[aLink.icon]}</div>
              {aLink.label}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Component