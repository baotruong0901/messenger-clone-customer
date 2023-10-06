"use client"

import { Message } from "@/lib/types/message";
import { useEffect, useRef, useState } from "react";
import BoxMessage from "./BoxMessage";
import useConversation from "@/hook/useConversation";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { Session } from "next-auth";
import { seen } from "@/lib/actions/seen.action";

interface Props {
    initialMessages: Message[];
    session: Session
}

const Body = ({ initialMessages, session }: Props) => {
    const [messages, setMessages] = useState(initialMessages)

    const containerRef = useRef<HTMLDivElement | null>(null)

    const { conversationId } = useConversation()

    const seenMessage = async () => {
        await seen(conversationId, session?.tokens?.accessToken)
    }
    useEffect(() => {
        seenMessage()
    }, [conversationId, session?.tokens?.accessToken]);

    useEffect(() => {
        if (containerRef.current) {
            const lastMessage = containerRef.current.lastElementChild;

            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: "auto", block: "end" });
            }
        }
    }, [messages]);

    useEffect(() => {
        pusherClient.subscribe(conversationId)

        const messageHandler = (message: Message) => {
            seenMessage()

            setMessages((current) => {
                if (find(current, { _id: message._id })) {
                    return current
                }
                return [...current, message]
            })

        }

        const updateMessageHandler = (newMessage: Message) => {
            setMessages((current) => current.map((currentMessage) => {
                // Kiểm tra nếu id của tin nhắn hiện tại trùng với id của tin nhắn mới
                if (currentMessage._id === newMessage._id) {
                    return newMessage;
                }

                return currentMessage;
            }))
        }

        const deleteMessageHandler = (message: Message) => {
            setMessages((current) => current.filter((item) => !message?.deleted.includes(session?.user?._id) || item._id !== message._id));
        }

        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('message:update', updateMessageHandler)
        pusherClient.bind('message:deleted', deleteMessageHandler);
        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new', messageHandler)
            pusherClient.unbind('message:update', updateMessageHandler)
            pusherClient.unbind('message:deleted', deleteMessageHandler)
        }

    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto pt-2" ref={containerRef} >
            {messages.length > 0 && messages.map((message, index) => {
                let showAvatar = false

                let showTimestamp = false

                if (index === 0) {
                    showTimestamp = true
                    // if (
                    //     messages.length === 1 &&
                    //     message.sender?._id !== session?.user?._id
                    // ) {
                    //     showAvatar = true;
                    // } else if (
                    //     messages.length > 1 &&
                    //     message.sender?._id !== session?.user?._id &&
                    //     messages[index + 1]?.sender?._id !== session?.user?._id
                    // ) {
                    //     showAvatar = true;
                    // }
                }
                else {
                    // Bắt đầu từ tin nhắn thứ hai
                    const previousMessage = messages[index - 1];

                    const prevMessageCreatedAt = new Date(previousMessage.createdAt);
                    const currentMessageCreatedAt = new Date(message.createdAt);
                    const timeDifferenceMinutes = (+currentMessageCreatedAt - +prevMessageCreatedAt) / (60 * 1000);


                    // Kiểm tra nếu người gửi của tin nhắn hiện tại khác người gửi của tin nhắn trước đó
                    // hoặc tin nhắn hiện tại là tin cuối cùng của người gửi khi chuyển từ một người gửi sang người gửi khác
                    if (message.sender?._id !== previousMessage.sender?._id ||
                        (message.sender?._id !== messages[index + 1]?.sender?._id && message.sender?._id !== session?.user?._id)) {
                        // Kiểm tra nếu tin nhắn hiện tại là tin cuối cùng của người gửi
                        if (message.sender?._id !== messages[index + 1]?.sender?._id) {
                            showAvatar = true;
                        }
                    }
                    if (showTimestamp && message.sender?._id !== session?.user?._id) {
                        showAvatar = true
                    }

                    if (timeDifferenceMinutes > 1 && message?.sender?._id !== previousMessage.sender?._id) {
                        showTimestamp = true;
                    }

                    // Kiểm tra nếu tin nhắn hiện tại là của bạn thì không hiển thị avatar
                    if (message.sender?._id === session?.user?._id) {
                        showAvatar = false;
                    }
                }

                return (
                    <BoxMessage
                        key={message._id}
                        data={message}
                        isLast={index === messages.length - 1}
                        showAvatar={showAvatar}
                        showTimestamp={showTimestamp}
                    />
                )
            }
            )}
        </div >
    );
}

export default Body;