import EmptyMessage from "@/components/EmptyMessage";
import Message from "./component/Message";
import { getConversationById } from "@/lib/actions/getConversationById";
import { getMessages } from "@/lib/actions/getMessages.action";

interface Props {
    conversationId: string
}

const Page = async ({ params }: { params: Props }) => {
    const { conversationId } = params

    const conversation = await getConversationById(conversationId)

    const messages = await getMessages(conversationId)

    const conversationById = await getConversationById(conversationId)

    if (!conversation && !conversationById) {
        return (
            <>

                <EmptyMessage />
            </>
        )
    }
    return (
        <>
            <Message
                conversation={conversation}
                messages={messages}
            />
        </>
    )
}

export default Page;