import getSession from "./getSession";

export async function updateUser(data: any, userId?: string, token?: string) {

    const formData: any = new FormData();
    formData.append("phone", data.phone);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("avatar", data.avatar[0]);

    const res = await fetch(`https://faithful-pot-production.up.railway.app/user/${userId}`, {
        method: 'PATCH',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}