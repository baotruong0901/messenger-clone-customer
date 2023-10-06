"use client"

import { User } from "@/lib/types/user";
import Modal from "./Modal";
import Avatar from "../box/Avatar";
import Button from "../ui/Button";
import { useCallback, useState } from "react";
import { createConversation } from "@/lib/actions/createConversation.action";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingModal from "./LoadingModal";
import Image from "next/image";

interface Props {
    isOpen?: boolean,
    onClose: () => void,
    data: User
}

const InfoModal = ({ isOpen, onClose, data }: Props) => {
    const router = useRouter()
    const session = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await createConversation({
                userId: data._id
            }, session?.data?.tokens?.accessToken)

            if (res) {
                router.push(`/conversations/${res._id}`)
            }

        } catch (error: any) {
            console.log(error);
        } finally {
            onClose()
            setIsLoading(false)
        }
    }, [data, router, onClose, session?.data?.tokens?.accessToken])

    return (

        <>
            {isLoading &&
                <LoadingModal />
            }
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                width="w-[320px]"
            >
                <div className="text-gray-300">
                    <h2 className="text-base font-semibold pb-3">
                        Thông tin tài khoản
                    </h2>
                    <div className="flex flex-col gap-y-4">
                        <div className="relative h-[140px] rounded-md mb-8 bg-gradient-to-b from-gray-200 to-gray-400">
                            <div className="absolute bottom-0 right-1/2 transform translate-y-1/2 translate-x-1/2">
                                <Image
                                    src={data?.avatar || '/images/placeholder.jpg'}
                                    alt="avatar"
                                    width={56}
                                    height={56}
                                    className="shadow-sm ring-2 ring-zinc-900 shadow-white/80 rounded-full"
                                />
                            </div>
                        </div>
                        <Button onClick={() => handleClick()}>Nhắn tin</Button>
                        <div className="flex flex-col gap-2 py-4">
                            <div className="font-medium">Thông tin cá nhân</div>
                            <div className="text-sm flex">
                                <p className="w-1/2">Tên</p>
                                <p className="w-fit">
                                    {data?.name}
                                </p>
                            </div>
                            <div className="text-sm flex">
                                <p className="w-1/2">Số điện thoại</p>
                                <span className="w-fit">
                                    {data?.phone}
                                </span>
                            </div>

                            {data?.description &&
                                <div className="text-sm flex">
                                    <p className="w-1/2">Mô tả</p>
                                    <span className="w-fit">
                                        {data.description}
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default InfoModal;