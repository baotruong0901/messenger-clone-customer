export const fetchData = async (url: string, method: string, body?: any, token?: string) => {
    return (await fetch(url, {
        method,
        body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).json()
}