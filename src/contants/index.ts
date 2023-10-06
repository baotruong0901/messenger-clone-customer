import { HiChat } from 'react-icons/hi';
import { HiUsers, HiOutlineUsers, HiOutlineUserGroup } from 'react-icons/hi2';

export const sidebarLinks = [
    {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
    },
    {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
    }
];

export const UserLink = [
    {
        label: 'Danh sách bạn bè',
        href: '/users',
        icon: HiOutlineUsers,
    },
    {
        label: 'Danh sách nhóm',
        href: '/groups',
        icon: HiOutlineUserGroup,
    }
];