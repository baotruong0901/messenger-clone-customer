import { User } from "./user";

export interface Message {
    _id: string,
    body?: string,
    image?: string,
    like?: boolean,
    seens: User[],
    sender: User,
    conversation: string,
    deleted: string[],
    recall: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}