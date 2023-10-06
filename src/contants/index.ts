import { signOut } from 'next-auth/react';
import { HiChat, HiUserGroup } from 'react-icons/hi';
import { HiUsers, HiOutlineUsers, HiOutlineUserGroup, HiArrowLeftOnRectangle } from 'react-icons/hi2';

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
    },
    {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle
    }
];

export const mobileLinks = [
    {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
    },
    {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
    },
    {
        label: 'Groups',
        href: '/groups',
        icon: HiUserGroup,
    },
    {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle
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