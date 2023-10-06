import { User } from "./user";

export interface Conversation {
    _id: string,
    name: string,
    users: User[],
    lastMessageAt: string,
    deletedBy: {
        user: string,
        deletedAt: string,
        _id: string
    }[],
    isGroup: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
    lastMessage: {
        _id: string,
        body?: string,
        image?: string,
        seens: User[],
        sender: User,
        like?: boolean,
        recall: boolean,
        deleted?: string[]
    },
}

