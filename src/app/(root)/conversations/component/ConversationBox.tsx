"use client"

import Avatar from "@/components/box/Avatar";
import AvatarGroup from "@/components/box/AvatarGroup";
import useConversation from "@/hook/useConversation";
import useOtherUser from "@/hook/useOtherUser";
import { Conversation } from "@/lib/types/conversation";
import { User } from "@/lib/types/user";
import { formatTime } from "@/lib/utils/formatTime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface Props {
    data: Conversation;
    user: User;
}

const ConversationBox = ({ data, user }: Props) => {
    const otherUser = useOtherUser(data)

    const { conversationId } = useConversation()

    const router = useRouter()

    const isSelected = useMemo(() => {
        return conversationId === data?._id
    }, [conversationId, data?._id])

    const senderLastMessage = useMemo(() => {
        return data?.lastMessage?.sender
    }, [data?.lastMessage])

    const isDeleted = useMemo(() => {
        if (!data?.deletedBy) {
            // Nếu không có deletedBy, trả về false
            return false;
        }

        // Kiểm tra xem _id của bạn có trong mảng deletedBy không
        const findUser = data.deletedBy.find((item) => item?.user === user?._id);

        if (findUser) {
            return new Date(findUser.deletedAt) > new Date(data?.lastMessageAt)
        }

        return false
    }, [data?.lastMessageAt, user, data.deletedBy])

    const lastMessageText = useMemo(() => {
        if (!isDeleted) {
            if (data?.lastMessage?.recall) {
                return `${senderLastMessage?._id === user?._id
                    ?
                    'Bạn đã thu hồi một tin nhắn.'
                    :
                    `${senderLastMessage?.name} đã thu hồi một tin nhắn. `
                    }`

            }
            else if (data?.lastMessage?.deleted?.includes(user._id)) {
                return 'Bạn đã xoá một tin nhắn.'
            }

            else {
                if (data?.lastMessage?.image) return `${data.isGroup
                    ?
                    `${senderLastMessage?._id === user?._id
                        ? 'Bạn: '
                        :
                        `${senderLastMessage?.name}:`} Sent an image.`
                    :
                    `${senderLastMessage?._id === user?._id
                        ? 'Bạn: '
                        :
                        ''} Sent an image.`}`

                if (data?.lastMessage?.body) return `${data.isGroup
                    ?
                    `${senderLastMessage?._id === user?._id
                        ? 'Bạn: '
                        : `${senderLastMessage?.name}: `} ${data?.lastMessage.body}.`
                    :
                    `${senderLastMessage?._id === user?._id
                        ? 'Bạn: '
                        : ''} ${data?.lastMessage.body}.`} `

                if (data?.lastMessage?.like) return `${data.isGroup
                    ? (
                        `${senderLastMessage?._id === user?._id
                            ? 'Bạn: '
                            : `${senderLastMessage?.name}: `
                        }`
                    )
                    : (
                        `${senderLastMessage?._id === user?._id
                            ? 'Bạn: '
                            : ''
                        }`
                    )
                    }`;
            }
        }
        return 'Started a conversation.'
    }, [data?.lastMessage, user, data.isGroup, isDeleted, senderLastMessage?._id, senderLastMessage?.name])

    const hasSeen = useMemo(() => {
        if (!data?.lastMessage) {
            return false
        }

        return data?.lastMessage?.seens?.filter((item) => item._id === user?._id).length !== 0
    }, [user?._id, data?.lastMessage])


    const listSeen = useMemo(() => {
        return data?.lastMessage?.seens?.filter((item) => item._id !== user?._id)
    }, [user?._id, data?.lastMessage])

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data._id}`)
    }, [data._id, router])

    return (
        <div className="mx-2">
            <div
                onClick={handleClick}
                className={`w-full flex gap-4 rounded-md items-center p-2 transition cursor-pointer hover:bg-gray-300/10 ${isSelected && ' bg-gray-300/[0.05]'}`}>
                {data.isGroup ? (
                    <AvatarGroup users={data?.users} />
                ) : (
                    <Avatar user={otherUser} className="w-11 h-11" />
                )}
                <div className="flex-1 min-w-0 mb-2">
                    <div className="focus:outline-none">
                        <p className={`text-md ${hasSeen ? 'font-light' : 'font-semibold'} text-white`}>
                            {data?.name || otherUser?.name}
                        </p>
                        <div className="flex items-center gap-1 ">
                            <p className={`truncate flex items-end gap-2 text-xs flex-1 ${hasSeen ? 'text-gray-500 font-light' : 'text-white font-bold'}`}>
                                {lastMessageText}
                                {!isDeleted && data?.lastMessage?.like &&
                                    <Image
                                        src={'/images/LIKE.png'}
                                        alt="Like"
                                        width={20}
                                        height={20}
                                    />
                                }
                            </p>
                            <p className="text-xs w-fit text-gray-400
                             font-light whitespace-nowrap">
                                {!isDeleted && formatTime(data.lastMessageAt)}
                            </p>
                        </div>
                    </div>
                </div>
                {senderLastMessage?._id === user?._id && hasSeen ?
                    <div className="flex items-center justify-end">
                        {data?.lastMessage?.seens?.length > 1 && data?.lastMessage?.seens?.length < 4 && listSeen?.map((item) => (
                            <Image
                                key={`avatar-${item?._id}`}
                                src={item?.avatar || '/images/placeholder.jpg'}
                                alt="image sender"
                                className="object-contain rounded-full"
                                width={14}
                                height={14}
                            />
                        ))}
                    </div>
                    :
                    <div className="flex items-center justify-end">
                        <Image
                            src={'/images/2598235.png'}
                            alt="image sender"
                            className="object-contain rounded-full"
                            width={14}
                            height={14}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default ConversationBox;