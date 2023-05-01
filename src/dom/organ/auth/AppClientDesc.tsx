import { useSession } from "next-auth/react"; 
import UserInformation from "@/dom/organ/auth/UserInformation";


export default function AppClientDesc() {

    const { data: session } = useSession();
    if (!session) return

    return <UserInformation data={session.user} />
}