"use client"

import Avatar from "@/components/box/Avatar";
import { Message } from "@/lib/types/message";
import { formatTimeMessage } from "@/lib/utils/formatTime";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoIosDoneAll } from "react-icons/io"
import { BsThreeDots } from "react-icons/bs"
import { AiFillLike } from "react-icons/ai";
import ActionModal from "@/components/modals/ActionModal";

interface Props {
    data: Message,
    isLast?: boolean,
    showAvatar: boolean,
    showTimestamp: boolean
}

const BoxMessage = ({ data, isLast, showAvatar, showTimestamp }: Props) => {
    const { recall, seens, sender } = data

    const [isOpen, setIsOpen] = useState(false);

    const session = useSession()

    const isOwn = session?.data?.user?._id === sender?._id

    const seenList = (seens || []).filter((user) => user._id !== session?.data?.user?._id).map((user) => user.avatar)

    return (
        <>
            <ActionModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                recall={recall}
                data={data}
                session={session?.data!}
            />

            {showTimestamp &&
                <span className="flex py-2 justify-center text-xs px-2 text-gray-500">
                    {formatTimeMessage(data?.createdAt)}
                </span>
            }
            <div className="relative px-4">
                {showAvatar && (
                    <div className="absolute left-4 bottom-0 ">
                        <Avatar user={data.sender} />
                    </div>
                )}
                <div className={`flex items-center group ${isOwn ? 'flex-row-reverse' : 'px-11'} py-[1px]`}>
                    <div className={`${isOwn && "items-end"} cursor-text`}>
                        {!data?.recall
                            ?
                            <div className={`${!data?.like && `text-sm flex flex-col shadow-md ${isOwn ? 'bg-blue-700 text-white' : 'bg-white/10 text-white'} ${data?.image ? 'rounded-md overflow-hidden p-0' : 'rounded-xl py-2 px-3'}`}`}>

                                {
                                    data?.image
                                        ?
                                        <div className="max-w-[288px] max-h-[288px]">
                                            <Image
                                                alt="image"
                                                width={288}
                                                height={288}
                                                layout="responsive"
                                                src={data?.image}
                                                className="object-contain cursor-pointer"
                                            />
                                        </div>
                                        :
                                        (
                                            <>
                                                <div className="relative group/time">
                                                    {data?.like ?
                                                        <AiFillLike size={60} className="text-blue-700" />
                                                        :
                                                        data?.body
                                                    }

                                                    <div className={`text-[10px] py-1 px-2 bg-black/80 rounded-md hidden duration-300 group-hover/time:block transition-all absolute bottom-[100%] ${isOwn ? 'right-[100%] -translate-x-1/4 translate-y-1/4' : 'left-[100%] translate-x-1/4 -translate-y-1/4'} transform  text-gray-300`}>
                                                        <div className=" max-w-[200px]">
                                                            {formatTimeMessage(data?.createdAt)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }


                            </div>
                            :
                            <div className="text-gray-600 italic rounded-3xl py-2 px-3 text-sm border border-gray-700 shadow-md">
                                Tin nhắn đã bị thu hồi.
                            </div>
                        }

                    </div>

                    <div
                        onClick={() => setIsOpen(true)}
                        className="px-2 cursor-pointer opacity-0 transition-opacity duration-300 
                    group-hover:opacity-100 group/menu"
                    >
                        <BsThreeDots size={24} className="text-gray-300" />
                    </div>
                </div>
                <div className="flex justify-end gap-x-[2px]
                 w-full flex-wrap">
                    {isLast && isOwn && seenList.map((avatar) => (
                        <Image
                            key={avatar}
                            src={avatar || '/images/placeholder.jpg'}
                            alt="image sender"
                            className="object-contain rounded-full"
                            width={14}
                            height={14}
                        />
                    ))}
                </div>
                {isLast && isOwn && seenList.length === 0 && (
                    <div className="mt-1 w-full flex items-center justify-end">
                        <div className="w-fit bg-white/10 rounded-3xl px-1 py-0.5 flex">
                            <IoIosDoneAll
                                className="text-sky-600"
                            />
                            <p className="text-xs text-gray-300 font-light">
                                Đã gửi
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default BoxMessage;