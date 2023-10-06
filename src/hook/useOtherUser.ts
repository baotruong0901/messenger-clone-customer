import { Conversation } from "@/lib/types/conversation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: Conversation) => {
    const session = useSession()

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?._id
        const result = conversation?.users?.filter((user) => user._id !== currentUserEmail)
        return result
    }, [session?.data?.user?.email, conversation?.users])

    return otherUser?.[0]
}
export default useOtherUser