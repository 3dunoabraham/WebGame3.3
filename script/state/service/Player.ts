const LOCAL_API_URL = "/api"

async function getPlayer (key:any,secret:any) {
    console.log("service player get player")
  try {
    const reqRes = await fetch(LOCAL_API_URL+"/player",{
      headers:{"Content-Type":"application/json"},
      method:"POST",
      body: JSON.stringify({apiKey:key,apiSecret:secret}),
    })
    console.log("service player reqRes")
    return await reqRes.json()
  } catch (e:any) {
    console.log("service player errrrror", e)
    return null
  }
}


export default {
    getPlayer,
  }