import Image from 'next/image'
import React from 'react';


import { fetchSession } from '../../script/state/repository/session';
import LoginForm from '@/dom/cell/form/LoginForm';
import LandingComponent from '@/module/landing/landing';
import imageAsset from '/public/images/image.webp'
import { FaExternalLinkAlt } from 'react-icons/fa';

export default async function Page() {  
  const session:any = await fetchSession()

  return (
    <main className='flex-col pos-rel  h-min-100vh' >

      <Image src={imageAsset} alt="inventory"
        className=' ma-3 bord-r-8 box-shadow-2-b z-100 ' width={100} height={100} 
      />
      
      {!session.user &&
        <>
          <LoginForm />
          <div className='flex-col mt-4'>
            <a href="https://demo.servicepad.com/agreements" target="_blank" 
              className="w-100 tx-mdl nowrap   pa-2 bord-r-8 opaci-chov--50 ims-bg-faded flex gap-2 px-4"
            >
                <div className="">Go to Portal</div>
                <div className="opaci-20"><FaExternalLinkAlt /></div>
            </a>
          </div>
        </>
      }
      {session.user && <LandingComponent /> }

    </main>
  )
}
