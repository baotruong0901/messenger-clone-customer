"use client"

import InfoModal from "@/components/modals/InfoModal";
import LoadingModal from "@/components/modals/LoadingModal";
import { createConversation } from "@/lib/actions/createConversation.action";
import { User } from "@/lib/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

interface Props {
    data: User
}

const UserCard = ({ data }: Props) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = useCallback(async () => {
        setIsLoading(true)

        try {
            const res = await createConversation({
                userId: data._id
            }, session?.tokens?.accessToken)

            if (res) {
                router.push(`/conversations/${res._id}`)
            }

        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }, [data, session])

    return (
        <>
            <InfoModal
                data={data}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            {isLoading &&
                <LoadingModal />
            }
            <article
                className="flex justify-between gap-4 items-center hover:bg-black/20 p-2 rounded-sm cursor-pointer">
                <div
                    onClick={() => handleClick()}
                    className="flex flex-1 items-start justify-start gap-3 sm:items-center">
                    <Image
                        src={data.avatar || '/images/placeholder.jpg'}
                        alt="avatar Image"
                        width={48}
                        height={48}
                        className="object-contain rounded-full"
                    />
                    <div className="flex-1 text-ellipsis">
                        <h4 className="text-base font-semibold">
                            {data.name}
                        </h4>
                        <p className="text-[12px] text-gray-500">
                            @{data.email}
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => setIsOpen(true)}
                    className="py-1 px-2 hover:bg-black/30 rounded-sm">
                    <BsThreeDots className="text-gray-500" />
                </div>
            </article>
        </>
    );
}

export default UserCard;