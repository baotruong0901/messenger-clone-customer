"use client"

import { UserLink } from "@/contants";
import UserItem from "./UserItem";

const User = () => {
    return (
        <>
            <div className="flex items-center justify-between m-4 px-3 md:px-4 text-white">
                <div className="text-2xl font-semibold md:block hidden">
                    Users
                </div>
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
        </>
    );
}

export default User; 