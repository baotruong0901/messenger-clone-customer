import { toast } from "react-hot-toast"

export async function signUp(data: any) {
    const { email, phone, name, password } = data

    const signUpResponse = await fetch(`http://localhost:8888/auth/signup/USER`, {
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