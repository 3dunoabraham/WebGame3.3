import { useSession } from "next-auth/react"; 
import UserInformation from "@/dom/organism/ims/items/molecules/auth/UserInformation";


export default function AppClientDesc() {
    // console.log("Hello from client");

    const { data: session } = useSession();
    if (!session) return

    return <UserInformation data={session.user} />
}