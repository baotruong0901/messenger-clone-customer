"use client"

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { mobileLinks } from "@/contants";
import SidebarToggle from "./SidebarToggle";
import { useSession } from "next-auth/react";
import Image from "next/image";


interface Props {
    isOpen?: boolean;
    onClose: () => void
}

const SideBarModal = ({ isOpen, onClose }: Props) => {
    const { data: session } = useSession()
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
                            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="-translate-x-full"
                                    enterTo="-translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="-translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                                        <div className="flex flex-col bg-zinc-900 h-full overflow-y-scroll py-6 px-4 shadow-xl shadow-gray-900 text-gray-300">
                                            <div className="fixed right-4  z-50 items-start justify-end">
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
                                            <div className="flex-1 relative">
                                                <div className="fixed top-0 left-0 right-0 bg-zinc-900/90 flex items-center gap-4 px-8 py-4">
                                                    <div className={`relative border border-gray-700 inline-block rounded-full overflow-hidden w-9 h-9`}>
                                                        <Image
                                                            fill
                                                            src={session?.user?.avatar || '/images/placeholder.jpg'}
                                                            alt="Avatar"
                                                        />
                                                    </div>
                                                    <span>
                                                        {session?.user?.name}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col mt-12" >
                                                    {mobileLinks.map((route) => (
                                                        <SidebarToggle
                                                            key={route.href}
                                                            href={route.href}
                                                            icon={route.icon}
                                                            onClick={route.onClick}
                                                            label={route.label}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default SideBarModal;