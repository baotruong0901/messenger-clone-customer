"use client"

import { sidebarLinks } from "@/contants";
import DesktopItem from "./DesktopItem";
import { User } from "@/lib/types/user";
import Avatar from "../box/Avatar";

interface Props {
    currentUser: User
}
const DesktopSidebar = ({ currentUser }: Props) => {
    return (
        <div className="fixed inset-y-0 left-0 z-40 w-[70px] flex py-2 flex-col justify-between items-center bg-black/80 border-gray-700 border-r">
            <nav>
                <ul className="space-y-1">
                    {sidebarLinks.map((item) => {
                        return (
                            <DesktopItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                onClick={item.onClick}
                            />
                        )
                    })}
                </ul>
            </nav>
            <nav>
                <div className="cursor-pointer hover:opacity-75">
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
    );
}

export default DesktopSidebar;