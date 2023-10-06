
export async function createMessage(data: any, conversationId: string, token?: string) {
    try {
        const formData = new FormData()
        if (data?.image) {
            formData.append("image", data?.image);
        }
        if (data?.like) {
            formData.append("like", data?.like);
        }

        if (data?.message) {
            formData.append("message", data?.message);
        }
        formData.append("conversationId", conversationId);

        const res = await fetch(`http://localhost:8888/messages`, {
            method: "POST",
            body: formData,
            headers: {
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