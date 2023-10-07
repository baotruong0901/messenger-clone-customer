'use client';

import useConversation from "@/hook/useConversation";
import MobileItem from "./MobileItem";
import { mobileLinks } from "@/contants";



const MobileFooter = () => {
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-zinc-900 md:hidden" >
            {mobileLinks.filter((item) => item.href !== "#").map((route) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
        </div>
    );
}

export default MobileFooter;