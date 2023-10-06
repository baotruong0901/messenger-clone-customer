import getSession from "./getSession"

export const getConversationById = async (conversationId: string) => {
    try {
        const session = await getSession()

        const conversation = await fetch(`${process.env.BACKEND_URL}/conversation/${conversationId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.tokens?.accessToken}`
            }
        })

        const result = await conversation.json()

        if (result.statusCode === 400) {
            return null
        }

        return result
    } catch (error: any) {
        return null
    }
}