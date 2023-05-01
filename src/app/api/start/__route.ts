
  

  import type { NextApiRequest, NextApiResponse } from 'next'
  import { createClient } from '@supabase/supabase-js'
  import crypto from 'crypto';
import { getSupabaseClient } from '@/../script/state/repository/supabase';
  
  export interface Start {
    id?: number
    name: string
    href?: string
    src?: string
    ipv4?: string
    datenow?: string
    hash?: string
    attempts?: number
    totalAttempts?: number
    goodAttempts?: number
  }
  

export const getUserHash = (req:any,apiSecret:any) => {
    
    // Get user's IP address
    let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;
    ipAddress = ipAddress.match(ipAddressRegex)[0]

    // Hash IP address to create a unique user ID
    const hash = crypto.createHash('sha256');
    hash.update(ipAddress);
    hash.update(apiSecret);
    const new_uid = hash.digest('hex');

    return new_uid
}
export async function POST(request: any, res:any) {
  const body:any = await request.json()
  const { apiKey,apiSecret } = body;


  const thehash = getUserHash(request,apiSecret)


}
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req
    const supabase:any = getSupabaseClient()
    
    const ipAddress:any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const hash = crypto.createHash('sha256');
    hash.update(ipAddress);
    const new_uid = hash.digest('hex');
  
    let asdasd:any = {
      name: body.name,
      ipv4: ipAddress,
      hash: new_uid,
      datenow: Date.now(),
    }
  
    switch (method) {
      case 'GET':
        try {
            // @ts-ignore
          const { data: existingStart, error } = await supabase
            .from<Start>('start')
            .select('*')
            .match({ hash: new_uid })
            .single()
      
          if (error) {
            throw error
          }
      
          res.status(200).json(existingStart)
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Failed to fetch start' })
        }
        break
      
        case 'POST':
          try {
    
            
            // @ts-ignore
            const { data: existingStart, error: selectError } = await supabase
            .from<Start>('start')
            .select('*')
            .match({ hash: new_uid })
            .single()
    
            if (existingStart) {
              throw new Error
              return
            }
    
            if (!existingStart) {
                // @ts-ignore
              const { data: start, error } = await supabase
              .from<Start>('start')
              .insert(asdasd)
              .single()
            if (error) {
              throw error
            }
            res.status(201).json(start)
          }
    
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Failed to create start' })
          }
          break
  
      
          case 'DELETE':
            try {
      
              
                // @ts-ignore
              const { data: existingStart, error: selectError } = await supabase
              .from<Start>('start')
              .select('*')
              .match({ hash: new_uid })
              .single()
      
              if (!existingStart) {
                throw new Error
                return
              }
      
      
              if (!!existingStart) {
                // @ts-ignore
                const { data: start, error } = await supabase
                .from<Start>('start')
              
              .delete()
              .match({ hash: new_uid })
  
                .single()
              if (error) {
                throw error
              }
              res.status(201).json(start)
            }
      
            } catch (error) {
              console.error(error)
              res.status(500).json({ message: 'Failed to create start' })
            }
            break
        
      default:
        res.setHeader('Allow', ['GET','POST', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
  