export async function deleteConversation(conversationId: string, token?: string) {

    const res = await fetch(`https://faithful-pot-production.up.railway.app/conversation/${conversationId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}