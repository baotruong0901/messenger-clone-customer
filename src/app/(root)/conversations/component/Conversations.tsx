import { Conversation } from "@/lib/types/conversation";
import { getConversations } from "@/lib/actions/getConversations.action";
import getSession from "@/lib/actions/getSession";
import ConversationList from "./ConversationList";
import { getUsers } from "@/lib/actions/getUsers.action";

const Conversations = async () => {
    const conversations: Conversation[] = await getConversations({
        searchString: undefined
    })

    const session = await getSession()

    const users = await getUsers({
        searchString: undefined
    })
    return (

        <ConversationList
            conversations={conversations}
            session={session!}
            users={users}
        />
    );
}

export default Conversations;