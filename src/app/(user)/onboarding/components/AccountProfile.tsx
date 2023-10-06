'use client'

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/lib/actions/updateUser.action";
import { UserInfo } from "@/lib/types/user";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AccountProfile = ({ user, session }: UserInfo) => {
    const router = useRouter()
    const pathname = usePathname()
    const {
        register,
        handleSubmit
    } = useForm<FieldValues>({
        defaultValues: {
            avatar: user?.avatar || "",
            name: user?.name || "",
            phone: user?.phone || "",
            description: user?.description || ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await updateUser(data, user._id, session?.tokens?.accessToken)
        if (pathname === '/profile/edit') {
            router.back()
        } else {
            router.push('/')
        }
    };

    return (
        <>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="flex items-center gap-4">
                    <div className="flex-1 text-base font-medium text-gray-200">
                        <input
                            type="file"
                            accept="image/*"
                            placeholder="Upload a photo"
                            className="h-10 w-full rounded-m  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium cursor-pointer border-none bg-transparent outline-none file:text-blue-500 !important"
                            {...register("avatar")}
                        />
                    </div>
                </div>
                <Input
                    id="name"
                    label="Name"
                    register={register}
                    required
                />

                <Input
                    id="phone"
                    label="Phone"
                    register={register}
                    required
                />

                <div>
                    <label className="text-white font-semibold">Description:</label>
                    <Textarea rows={10} {...register("description", { required: true })}
                        className="text-white" />
                </div>
                <Button fullWidth type="submit">
                    Submit
                </Button>
            </form>

        </>
    );
}

export default AccountProfile;