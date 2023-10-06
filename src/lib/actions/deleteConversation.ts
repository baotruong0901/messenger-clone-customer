export async function deleteConversation(conversationId: string, token?: string) {

    const res = await fetch(`http://localhost:8888/conversation/${conversationId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}