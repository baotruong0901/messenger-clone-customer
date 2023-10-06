import getSession from "./getSession"

export const getUsers = async ({
    searchString = "",
    pageNumber = 1,
    pageSize = 25,
}: {
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
}) => {
    try {
        const session = await getSession()

        const users = (await fetch(`${process.env.BACKEND_URL}/user/all?searchString=${searchString}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.tokens?.accessToken}`
            }
        })).json()
        return users
    } catch (error: any) {
        console.log(error);
        return null
    }
}