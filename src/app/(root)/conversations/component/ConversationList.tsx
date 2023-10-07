"use client"

import { Conversation } from "@/lib/types/conversation";
import { Session } from "next-auth";
import ConversationBox from "./ConversationBox";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { User } from "@/lib/types/user";
import GroupModal from "./GroupModal";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import useConversation from "@/hook/useConversation";
import { IoReorderThree } from 'react-icons/io5'
import SideBarModal from "./SideBarModal";

interface Props {
    conversations: Conversation[];
    session: Session;
    users: User[];
}
const ConversationList = ({ conversations, users, session }: Props) => {

    const [conversationItems, setConversationItems] = useState(conversations)
    const { isOpen } = useConversation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (!session) {
            return
        }

        pusherClient.subscribe(session?.user?.email)

        const newHandler = (conversation: Conversation) => {
            setConversationItems((current) => {
                if (find(current, { _id: conversation._id })) {
                    return current
                }
                return [conversation, ...current]
            })
        }

        const updateHandler = (conversation: Conversation) => {
            setConversationItems((current) => {
                const updatedItems = current.map((item) => {
                    if (item._id === conversation._id) {
                        return {
                            ...item,
                            lastMessage: conversation.lastMessage,
                            lastMessageAt: conversation?.lastMessageAt
                        }
                    }
                    return item;
                })
                updatedItems.sort((a, b) => {
                    if (a?.lastMessageAt > b?.lastMessageAt) {
                        return -1;
                    }
                    if (a.lastMessageAt < b.lastMessageAt) {
                        return 1;
                    }
                    return 0;
                });
                return updatedItems;
            });
            console.log("updateHandler");
        }

        const deleteHandler = (conversation: Conversation) => {
            setConversationItems((current) =>
                current.filter((item) => item._id !== conversation._id)
            )
        }


        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:delete', deleteHandler);

        return () => {
            pusherClient.unsubscribe(session?.user?.email)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:delete', deleteHandler);

        }
    }, [session])

    console.log("isOpen", isOpen);


    return (
        <>
            <GroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                users={users}
            />
            <SideBarModal
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <aside className={`${isOpen ? 'hidden' : 'block w-full'}  overflow-y-auto md:block border-r border-gray-700 md:w-80 bg-black/90`}>
                <div className={`flex items-center justify-between m-4 px-3 md:px-4 text-white`}>
                    <div
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden block cursor-pointer hover:opacity-75">
                        <IoReorderThree size={40} />
                    </div>
                    <div className="text-2xl font-semibold">
                        Chat
                    </div>
                    <div
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => setIsModalOpen(true)}>
                        <HiOutlinePencilAlt size={24} />
                    </div>
                </div>
                {conversationItems && conversationItems.length > 0 ? conversationItems.map((conversation) => (
                    <ConversationBox
                        key={conversation._id}
                        data={conversation}
                        user={session?.user!}
                    />

                ))
                    :
                    <div className="mx-8 text-gray-400 font-medium ">
                        No conversation
                    </div>
                }
            </aside>
        </>
    );
}

export default ConversationList;