import getSession from "./getSession"

export const getMessages = async (conversationId: string) => {
    try {
        const session = await getSession()

        const messages = (await fetch(`http://localhost:8888/messages/${conversationId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.tokens?.accessToken}`
            }
        })).json()
        return messages
    } catch (error: any) {
        console.log(error);
        return null
    }
}