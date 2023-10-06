"use client"

import Avatar from "@/components/box/Avatar";
import AvatarGroup from "@/components/box/AvatarGroup";
import useOtherUser from "@/hook/useOtherUser";
import { Conversation } from "@/lib/types/conversation";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import { useState } from "react";

interface Props {
    conversation: Conversation
}

const Header = ({ conversation }: Props) => {
    const otherUser = useOtherUser(conversation)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ProfileDrawer
                otherUser={otherUser}
                data={conversation}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <div className="flex items-center justify-between border-b border-gray-700 py-3 px-4 sm:px-4 lg:px-6">
                <div className="flex items-center gap-4">
                    {conversation?.isGroup ? (
                        <AvatarGroup
                            users={conversation?.users}
                        />
                    ) : (
                        <Avatar
                            user={otherUser}
                        />
                    )}
                    <div className="flex flex-col">
                        <div className="text-white">
                            {conversation.name || otherUser?.name}
                        </div>
                        <span className="text-sm font-light text-neutral-500">
                            Đang hoạt động
                        </span>
                    </div>

                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setIsOpen(true)}
                    className="text-gray-300 cursor-pointer hover:text-gray-400 transition"
                />
            </div>
        </>
    );
}

export default Header;