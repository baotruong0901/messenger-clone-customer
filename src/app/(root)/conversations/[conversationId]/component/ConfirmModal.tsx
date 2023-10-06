"use client"

import Modal from "@/components/modals/Modal";
import Button from "@/components/ui/Button";
import useConversation from "@/hook/useConversation";
import { deleteConversation } from "@/lib/actions/deleteConversation";
import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi"

interface Props {
    isOpen?: boolean,
    onClose: () => void
}

const ConfirmModal = ({ isOpen, onClose }: Props) => {
    const [isLoading, setIsLoading] = useState(false)

    const conversationId = useConversation()
    const session = useSession()
    const router = useRouter()

    const handleDelete = useCallback(async () => {
        setIsLoading(true)

        try {
            await deleteConversation(conversationId, session?.data?.tokens?.accessToken)
        } catch (error: any) {
            console.log(error);
        } finally {
            onClose()
            setIsLoading(false)
            router.push('/conversations')
        }
    }, [conversationId, router, onClose, session?.data?.tokens?.accessToken])


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col items-center w-full gap-2">
                <div className="w-full flex justify-center items-center gap-2 pb-2 border-b border-gray-300">
                    <FiAlertTriangle className="h-6 w-6 text-red-500" />
                    <Dialog.Title as="h3" className="text-base font-semibold text-gray-300">
                        Xoá đoạn chat
                    </Dialog.Title>
                </div>

                <p className="flex justify-start w-full text-sm text-gray-500">
                    Bạn không thể hoàn tác sau khi xóa bản sao của cuộc trò chuyện này.
                </p>

                <div className="w-full mt-4 flex flex-row-reverse">
                    <Button disabled={isLoading}
                        onClick={() => handleDelete()}
                    >
                        Xoá đoạn chat
                    </Button>
                    <Button
                        disabled={isLoading}
                        secondary
                        onClick={onClose}
                    >
                        Huỷ
                    </Button>
                </div>
            </div>
        </Modal >
    );
}

export default ConfirmModal;