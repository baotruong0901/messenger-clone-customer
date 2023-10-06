"use client"

import Modal from "@/components/modals/Modal";
import Button from "@/components/ui/Button";
import { Type, delateMessage } from "@/lib/actions/deleteMessage";
import { Message } from "@/lib/types/message";
import { Dialog } from "@headlessui/react";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi"

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    recall: boolean;
    data: Message;
    session?: Session
}

const ActionModal = ({ isOpen, onClose, recall, data, session }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const isOwn = useMemo(() => {
        return data?.sender?._id === session?.user?._id
    }, [data])

    const hanldeDelete = async () => {
        setIsLoading(true)
        let result
        if (isOwn) {
            if (recall) {
                result = await delateMessage(Type.deleted, data?._id, session?.tokens?.accessToken)
            } else {
                result = await delateMessage(Type.recall, data?._id, session?.tokens?.accessToken)
            }

        } else {
            result = await delateMessage(Type.deleted, data?._id, session?.tokens?.accessToken)
        }

        if (result?.statusCode === 200) {
            setIsLoading(false)
        }
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col items-center w-full gap-2">
                <div className="w-full flex justify-center items-center gap-2 pb-2 border-b border-gray-300">
                    <FiAlertTriangle className="h-6 w-6 text-red-500" />
                    <Dialog.Title as="h3" className="text-base font-semibold text-gray-300">
                        {isOwn ? 'Gỡ tin nhắn' : 'Gỡ ở phía bạn'}
                    </Dialog.Title>
                </div>

                <p className="flex justify-start w-full text-sm text-gray-500">
                    {isOwn ? `Tin nhắn này sẽ bị ${recall ? 'xoá' : 'thu hồi'} với mọi người trong đoạn chat.` : 'Chúng tôi sẽ gỡ tin nhắn này cho bạn. Những thành viên khác trong đoạn chat vẫn có thể xem được.'}
                </p>

                <div className="w-full mt-4 flex flex-row-reverse">
                    <Button disabled={isLoading}
                        onClick={() => hanldeDelete()}
                    >
                        Xoá, gỡ
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
        </Modal>
    );
}

export default ActionModal;