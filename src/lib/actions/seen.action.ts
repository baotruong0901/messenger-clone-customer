export async function seen(conversationId: string, token?: string) {
    try {

        const res = await fetch(`https://faithful-pot-production.up.railway.app/conversation/${conversationId}/seen`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return res
    } catch (error: any) {
        console.log(`${error}`);
        return null
    }
}