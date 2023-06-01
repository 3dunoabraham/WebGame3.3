

export async function fetchSamePlayerCount(supabase:any, hash:any) {
    const { data:exists, count } = await supabase
    .from('start')
    .select('*', { count: 'exact', head: true })
    .filter("hash", 'eq', hash)
    return count
}

export async function fetchPostPlayer(supabase:any, playerObj:any) {
    const { data: start, error } = await supabase
              .from('start')
              .insert(playerObj)
              .single()
    return !error
}

export async function fetchPlayer(supabase:any, new_uid:any) {
    const { data: existingStart, error: selectError } = await supabase
        .from('start')
        .select('*')
        .match({ hash: new_uid })
        .single()
    return existingStart
}

export async function fetchSameIPCount(supabase:any, ipAddress:any) {

    const { data:ipexists, count:ipcount } = await supabase
        .from('start')
        .select('totalAttempts', { count: 'exact', head: true })
        .filter("ipv4", 'eq', ipAddress)
  
    return ipcount
}

export async function fetchPutPlayer(supabase:any, playerObj:any, new_uid:any, orderObj:any) {

    const { data: removeattempt, error:error_removeattempt } = await supabase
        .from('start')
        .update({
            attempts: playerObj.attempts - 1,
            totalAttempts: playerObj.totalAttempts + 1,
            datenow: `${Date.now()}`,
            trades: playerObj.trades + JSON.stringify(orderObj)+"&&&",
        })
        .match({ hash: new_uid })
        .single()

  
    return !error_removeattempt
}

export async function fetchPutGoodPlayer(supabase:any, playerObj:any, new_uid:any ) {

    const { data: removeattempt, error:error_removeattempt } = await supabase
        .from('start')
        .update({
            goodAttempts: playerObj.goodAttempts + 1,
            trades: ""
        })
        .match({ hash: new_uid })
        .single()

  
    return !error_removeattempt
}

export async function fetchPutPlayerAPI(supabase:any, playerObj:any, new_uid:any, binancePublic:any, binanceSecret:any ) {
    let secret1 = process.env.PROMOCODE1
    let secret2 = process.env.PROMOCODE2
    let thesubLevel = playerObj.subscription
    let newsubLevel = thesubLevel > 0 ? thesubLevel : (
        binancePublic == secret1 && binanceSecret == secret2 ? 1 : 0
    )
    const { data: removeattempt, error:error_removeattempt } = await supabase
        .from('start')
        .update({
            subscription: newsubLevel,
            binancekeys: `${binancePublic}:${binanceSecret}`
        })
        .match({ hash: new_uid })
        .single()

  
    return !error_removeattempt
}