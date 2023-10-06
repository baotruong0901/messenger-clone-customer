
export async function createConversation(data: any, token?: string) {
    const { isGroup, name, members, userId } = data
    try {
        const res = await fetch(`http://localhost:8888/conversation`, {
            method: "POST",
            body: JSON.stringify({
                isGroup,
                name,
                members: members?.map((member: any) => member.value),
                userId
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        const result = await res.json()


        if (result.statusCode === 400) {
            return null
        }

        return result
    } catch (error: any) {
        console.log(`${error}`);
        return null
    }
}