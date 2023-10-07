"use client"

import { UserLink } from "@/contants";
import UserItem from "./UserItem";
import { IoReorderThree } from "react-icons/io5";
import { useState } from "react";
import SideBarModal from "../../conversations/component/SideBarModal";

const User = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <SideBarModal
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <aside className={`hidden md:block border-r border-gray-700 md:w-80 w-full bg-black/90`}>
                <div className="flex items-center justify-between m-4 px-3 md:px-4 text-white">
                    <div
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden block cursor-pointer hover:opacity-75">
                        <IoReorderThree size={40} />
                    </div>
                    <div className="text-2xl font-semibold">
                        Users
                    </div>
                    <div></div>
                </div>
                <nav>
                    <ul>
                        {UserLink.map((item) => {
                            return (
                                <UserItem
                                    key={item.label}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            )
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default User; 