import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

function getCryptoPriceDecimals(symbol: string): number {
  const lookupTable: { [key: string]: number } = {
    'BTC': 5,
    'ETH': 5,
    'BNB': 4,
    'USDT': 4,
    'ADA': 4,
    'DOGE': 8,
    'XRP': 4,
    'DOT': 4,
    'UNI': 4,
    'SOL': 4
  };
  return lookupTable[symbol] || 2;
}

function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }:any, apiKey: string, apiSecret: string, callback: Function) {
  const options: https.RequestOptions = {
    hostname: 'api.binance.com',
    port: 443,
    path: '/api/v3/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };
  let _price = price.toFixed(getCryptoPriceDecimals(symbol))
  console.log(price,"->",_price)
  console.log("quantity",quantity)
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';

    res.on('data', (data) => {
      result += data;
    });

    res.on('end', () => {
      callback(JSON.parse(result));
    });
  });

  req.on('error', (err) => {
    console.log("error place order",err)
    callback(err);
  });

  req.write(data);
  req.end();
}

const env_BINANCE_PUBLIC = process.env.BINANCE_PUBLIC
const env_BINANCE_SECRET = process.env.BINANCE_SECRET

function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set your Binance API key and secret here
//   const apiKey = 'YOUR_API_KEY';
//   const apiSecret = 'YOUR_API_SECRET';
  
    const apiKey:any = env_BINANCE_PUBLIC
    const apiSecret:any = env_BINANCE_SECRET

  // Retrieve the parameters from the request body
  const { side, symbol, quantity:_quantity, price:_price } = req.body;
  console.log("req body", { side, symbol, quantity:_quantity, price:_price })
  const { quantity, price } = adjustOrderParams(req.body);
  // Call the makeLimitOrder function with the retrieved parameters
  console.log("makelimitorder", { side, symbol, quantity, price })
  makeLimitOrder(
    { side, symbol, quantity, price },
    apiKey,
    apiSecret,
    (result: any) => {
      res.status(200).json(result);
    }
  );
}

  function adjustOrderParams({ side, symbol, quantity, price }: LimitOrderParams): { quantity: number; price: number } {
    const lookupTable: { [key: string]: number } = {
      BTC: 5,
      ETH: 5,
      BNB: 4,
      USDT: 4,
      ADA: 4,
      DOGE: 8,
      XRP: 4,
      DOT: 4,
      UNI: 4,
      SOL: 4,
    };
  
    const decimalPlaces = lookupTable[symbol] || 2;
    const adjustedQuantity = parseQuantity(symbol.toUpperCase(),quantity);
    const adjustedPrice = Number(price.toFixed(decimalPlaces));
  
    return { quantity: adjustedQuantity, price: adjustedPrice };
  }
  
function parseQuantity(symbol: string, quantity: number): number {
    console.log("parseQuantity", symbol, quantity)
    const lookupTable: { [key: string]: number } = {
      'BTCUSDT': 5,
      'ETHUSDT': 4,
      'BNBUSDT': 4,
      'USDTUSDT': 4,
      'ADAUSDT': 4,
      'DOGEUSDT': 8,
      'XRPUSDT': 4,
      'DOTUSDT': 4,
      'UNIUSDT': 4,
      'SOLUSDT': 4
    };
    const decimalPlaces = lookupTable[symbol] || 2;
    return Number(parseFloat(`${quantity}`).toFixed(decimalPlaces));
  }


  
export async function POST(request: NextRequest) {
    // const cookieStore = cookies();
    // const oldJWTjwt = cookieStore.get(JWTNAME);
    // console.log("oldJWTjwt", oldJWTjwt)
  
    const body:any = await request.json()

    // const reqRes:any = await fetchLogin({
    //   email: body.email,
    //   password: body.password,
    // })
    // if (!reqRes) {
    //   console.log("no ok from server")
    //   return null
    // }
  


  // Retrieve the parameters from the request body
  const { side, symbol, quantity:_quantity, price:_price,apiKey,apiSecret } = body;
  console.log("req body", { side, symbol, quantity:_quantity, price:_price })
  const { quantity, price } = adjustOrderParams(body);
  // Call the makeLimitOrder function with the retrieved parameters
  console.log("makelimitorder", { side, symbol, quantity, price })
  makeLimitOrder(
    { side, symbol, quantity, price },
    apiKey,
    apiSecret,
    (result: any) => {
    //   res.status(200).json(result);
        console.log("resulttt?", result)
    }
  );

    const fullRes = new Response(JSON.stringify({}));
    // const fullRes = new Response(JSON.stringify(reqRes));
    // fullRes.headers.append(
    //   'Set-Cookie', JWTNAME + '=' + reqRes.jwt +
    //   '; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=3600'
    // );
  
    return fullRes
  }
  
  