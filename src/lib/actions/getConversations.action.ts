import { fetchData } from "./fetchData.action"
import getSession from "./getSession"

export const getConversations = async ({ isGroup = false, searchString = "", pageNumber = 1, pageSize = 25 }: { isGroup?: boolean, searchString?: string, pageNumber?: number, pageSize?: number }) => {
    try {
        const session = await getSession()

        const conversations = await fetch(`http://localhost:8888/conversation?searchString=${searchString}&isGroup=${isGroup}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.tokens?.accessToken}`
            }
        })

        return conversations.json()
    } catch (error: any) {
        return null
    }
}