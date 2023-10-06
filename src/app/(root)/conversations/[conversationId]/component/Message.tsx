import { Conversation } from "@/lib/types/conversation";
import { Message } from "@/lib/types/message";
import Header from "./Header";
import Body from "./Body";
import Form from "./Form";
import getSession from "@/lib/actions/getSession";

interface Props {
    conversation: Conversation;
    messages: Message[]
}

const Message = async ({ conversation, messages }: Props) => {
    const session = await getSession()
    return (
        <div className="bg-zinc-900 flex-1 flex flex-col">
            <Header conversation={conversation} />
            <Body
                initialMessages={messages}
                session={session!}
            />
            <Form />
        </div>

    )
}

export default Message;