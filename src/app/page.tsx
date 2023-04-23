import Image from 'next/image'


import { fetchSession } from '../../script/state/repository/session';
import LoginForm from '@/dom/molecule/LoginForm';
import React from 'react';
import Scene from '@/model/core/Scene';
import imageAsset from '/public/images/image.webp'
import Link from 'next/link';

export default async function Home() {  
  const session:any = await fetchSession()

  return (
    <main className='flex-col pos-rel  h-min-100vh' >

      <Image src={imageAsset} alt="inventory"
        className=' ma-3 bord-r-8 box-shadow-2-b z-100 ' width={100} height={100} 
      />
      
      {!session.user && <LoginForm />}
      {session.user && <>
        {/* <div className='flex-col tx-lx opaci-10 py-8'>Welcome Back!</div> */}
        <div className='flex w-100 flex-justify-stretch h-min-100vh  pos-abs pa-8 '>

          <Link className='tx-xl tx-center tx-white flex-col opaci-chov--75 flex-1 noverflow bord-r-8' href="https://demo.servicepad.com/agreements" style={{background:"#3E5F58"}}>
            Enter <br /> PORTAL
          </Link>
          <Link className='tx-xl tx-center tx-gray flex-col  noverflow bord-r-8 bg-b-hov-10 flex-1'
            href="/inventory" style={{background:"#"}}
          >
            Enter <br /> INVENTORY
          </Link>
        </div>
      </>}

      {/* <div className=' w-100 h-100 pos-abs z--1'>
        <Scene />
      </div> */}

    </main>
  )
}
