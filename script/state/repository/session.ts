import { cookies } from "next/headers";


import { JWTNAME, fetchUser } from "./auth";
import CONSTANTS from '@/../script/constant/json/api.json'

export const fetchJWT = async () => {
    const cookieStore = cookies();
    const cookieObject:any = cookieStore.get(JWTNAME)
    return !!cookieObject ? cookieObject.value : null;
}

export const fetchSession = async (isDemo:boolean = false) => {
    const foundJWT:any = await fetchJWT()
    let foundUser:any = null
    if (isDemo) {
        foundUser = !!foundJWT ? CONSTANTS.DEMO_USER : null
    } else {
        foundUser = !!foundJWT ? await fetchUser(foundJWT) : null
    }
    return {
        jwt: foundJWT,
        user: foundUser,
    }
}

export default {
    fetchJWT
}
