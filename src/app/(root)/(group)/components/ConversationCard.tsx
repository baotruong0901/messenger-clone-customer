"use client"

import AvatarGroup from "@/components/box/AvatarGroup";
import Button from "@/components/ui/Button";
import { Conversation } from "@/lib/types/conversation";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";

interface Props {
    data: Conversation
}

const ConversationCard = ({ data }: Props) => {

    const router = useRouter()

    return (
        <>
            <div
                className="flex flex-col justify-between gap-4 max-sm:rounded-xl max-sm:bg-black/40 max-sm:p-4 sm:flex-row sm:items-center sm:hover:bg-black/20 p-2 rounded-sm cursor-pointer">
                <div
                    onClick={() => router.push(`/conversations/${data._id}`)}
                    className="flex flex-1 items-start justify-start gap-3 sm:items-center">
                    <AvatarGroup
                        users={data.users}
                    />
                    <div className="flex-1 text-ellipsis">
                        <h4 className="text-base font-semibold">
                            {data.name}
                        </h4>
                        <p className="text-[12px] text-gray-500">
                            {data.users.length} thành viên
                        </p>
                    </div>
                </div>
                <div>
                    <BsThreeDots className="text-gray-500" />
                </div>
            </div>
        </>
    );
}

export default ConversationCard;