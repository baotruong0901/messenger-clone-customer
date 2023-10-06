import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()
    const routes = useMemo(() => [
        {
            label: 'Đoạn chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Người dùng',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Đăng xuất',
            onClick: () => signOut(),
            href: '#',
            icon: HiArrowLeftOnRectangle
        }
    ], [])
    return routes;
}

export default useRoutes;