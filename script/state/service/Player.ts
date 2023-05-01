const LOCAL_API_URL = "/api"

async function getPlayer (key:any,secret:any) {
  try {
    const reqRes = await fetch(LOCAL_API_URL+"/player",{
      headers:{"Content-Type":"application/json"},
      method:"POST",
      body: JSON.stringify({apiKey:key,apiSecret:secret}),
    })
    return await reqRes.json()
  } catch (e:any) {
    return e
  }
}


export default {
    getPlayer,
  }