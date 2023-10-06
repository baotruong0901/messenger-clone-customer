'use client'

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useParams, usePathname, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthSocialbutton from "@/components/AuthSocialbutton";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { signUp } from "@/lib/actions/signup.action";


const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push('/conversations')
        }
    }, [session?.status, router])


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (pathname === '/auth/signup') {
            const register = await signUp(data)

            if (register) {
                router.push("/auth/signin")
            }
            setIsLoading(false)

        }

        if (pathname === '/auth/signin') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!');
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success('Logged in!')
                        router.push("/conversations")
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        // setIsLoading(true)

        // signIn(action, { redirect: false })
        //     .then((callback) => {

        //         if (callback?.error) {
        //             toast.error('Invalid credentials!');
        //         }

        //         if (callback?.ok && !callback?.error) {
        //             toast.success('Logged in!')
        //             router.push('/')
        //         }
        //     })
        //     .finally(() => setIsLoading(false))
    }


    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {pathname === '/auth/signup' && (
                        <>
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="name"
                                label="Name"
                            />
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="phone"
                                label="Phone"
                            />
                        </>
                    )}
                    <Input
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {pathname === '/auth/signin' ? isLoading ? 'loading...' : 'Sign in' : isLoading ? 'loading...' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialbutton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialbutton
                            icon={FcGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-center text-sm mt-6 px-2 text-gray-500">
                        <span>
                            {pathname === '/auth/signin' ? 'New to Messenger?' : 'Already have an account?'}
                        </span>
                        <span
                            onClick={() => router.push(`${pathname === '/auth/signup' ? '/auth/signin' : '/auth/signup'}`)}
                            className="underline cursor-pointer"
                        >
                            {pathname === '/auth/signin' ? 'Create an account' : 'Login'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;