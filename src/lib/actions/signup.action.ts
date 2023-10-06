import { toast } from "react-hot-toast"

export async function signUp(data: any) {
    const { email, phone, name, password } = data

    const signUpResponse = await fetch(`https://faithful-pot-production.up.railway.app/auth/signup/USER`, {
        method: "POST",
        body: JSON.stringify({
            name,
            phone,
            email,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await signUpResponse.json()


    if (result.statusCode === 400) {
        toast.error(result.message)
        return
    }
    toast.success("Succeed!")
    return await signUpResponse.json()
}