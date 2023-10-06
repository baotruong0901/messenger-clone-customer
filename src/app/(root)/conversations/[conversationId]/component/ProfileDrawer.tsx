"use client"

import Avatar from "@/components/box/Avatar";
import AvatarGroup from "@/components/box/AvatarGroup";
import { Conversation } from "@/lib/types/conversation";
import { User } from "@/lib/types/user";
import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoMdClose, IoMdTrash } from "react-icons/io";
import ConfirmModal from "./ConfirmModal";

interface Props {
    data: Conversation;
    isOpen?: boolean;
    onClose: () => void;
    otherUser: User;
}

const ProfileDrawer = ({ data, isOpen, onClose, otherUser }: Props) => {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const joinedDate = useMemo(() => {
        return format(new Date(data?.createdAt), 'PP')
    }, [data])

    const title = useMemo(() => {
        return data?.name || otherUser?.name
    }, [data.name, otherUser.name])

    return (
        <>
            <Transition.Root appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={onClose} className="relative z-40">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white bg-opacity-10" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform inset-0 ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="ransform inset-0 ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                                        <div className="flex flex-col bg-zinc-900 h-full overflow-y-scroll py-6 px-4 shadow-xl shadow-gray-900 text-gray-300">
                                            <div className="flex items-start justify-end">
                                                <button
                                                    type="button"
                                                    onClick={onClose}
                                                    className="rounded-full focus:outline-none focus:ring-0 hover:bg-gray-500 duration-300"
                                                >
                                                    <span className="sr-only">
                                                        Close panel
                                                    </span>
                                                    <IoMdClose size=
                                                        {24}
                                                        className="text-gray-300"
                                                    />
                                                </button>
                                            </div>
                                            <div className="flex-1 relative mt-6">
                                                <div className="flex flex-col items-center">
                                                    <div>
                                                        {data?.isGroup ? <AvatarGroup
                                                            users={data?.users}
                                                        /> : <Avatar
                                                            user={otherUser}
                                                            className="w-14 h-14"
                                                        />}
                                                    </div>
                                                    <div className="text-xl">
                                                        {title}
                                                    </div>
                                                    <div className="text-xs">
                                                        Đang hoạt động
                                                    </div>

                                                    <div
                                                        onClick={() => setConfirmOpen(true)}
                                                        className="flex flex-col items-center cursor-pointer hover:opacity-75 my-8">
                                                        <IoMdTrash size={24} className="text-sky-600"
                                                        />
                                                        <div className="text-xs font-light">
                                                            Xoá
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <dl className="space-y-8 px-6">
                                                            {data?.isGroup ? (
                                                                <>
                                                                    <div>
                                                                        <dt> Emails
                                                                        </dt>
                                                                        <dd>
                                                                            {data.users.map((user) => (
                                                                                <div
                                                                                    key={user.email}
                                                                                    className="text-sm"
                                                                                >
                                                                                    {user.email}
                                                                                </div>
                                                                            ))}
                                                                        </dd>
                                                                    </div>
                                                                    <div>
                                                                        <dt className="text-sm font-medium sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>

                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div>
                                                                        <dt className="text-sm font-medium sm:w-40 sm:flex-shrink-0">
                                                                            Email
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm sm:col-span-2">
                                                                            {otherUser?.email}
                                                                        </dd>
                                                                    </div>

                                                                    <div>
                                                                        <dt className="text-sm font-medium sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                    <ConfirmModal
                        isOpen={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                    />
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default ProfileDrawer;