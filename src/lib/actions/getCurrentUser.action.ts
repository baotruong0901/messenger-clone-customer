import getSession from "./getSession"

export const getCurrentUser = async () => {
    try {
        const session = await getSession()

        if (!session?.user) {
            return null
        }

        const currentUser = await fetch(`http://localhost:8888/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.tokens?.accessToken}`
            }
        })

        return currentUser.json()

    } catch (error: any) {
        return null
    }
}