export enum Type {
    "deleted" = "deleted",
    "recall" = "recall",
}

export async function delateMessage(type: Type, messageId: string, token?: string) {

    const res = await fetch(`http://localhost:8888/messages/${type}/${messageId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}