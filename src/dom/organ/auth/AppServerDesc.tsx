import { getServerSession } from "next-auth/next";
import UserInformation from "@/dom/organ/auth/UserInformation";


export default async function AppServerDesc() {
    const session:any = await getServerSession();
    return (<>
        <div>
            <div>This is the application description component (server component).</div>
            <UserInformation data={session.user} />
        </div>
    </>);
}