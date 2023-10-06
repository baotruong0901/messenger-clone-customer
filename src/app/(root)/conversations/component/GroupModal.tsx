import Modal from "@/components/modals/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { createConversation } from "@/lib/actions/createConversation.action";
import { User } from "@/lib/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    users: User[]
}

const GroupModal = ({ isOpen, onClose, users }: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: []
        }
    })

    const members = watch('members')

    const onSumit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        try {
            const res = await createConversation({ ...data, isGroup: true }, session?.tokens?.accessToken)
            if (res.status === 400) {
                toast.error(res.message)
            } else {
                router.push(`/conversations/${res?._id}`)
                onClose()
                setValue("name", "")
                setValue("members", [])
            }
        } catch (error: any) {
            console.log(error);
            toast.error("error")

        } finally {
            setIsLoading(false)
        }

    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit(onSumit)}
            >
                <div className="space-y-8 text-gray-300">
                    <div className="border-b border-gray-500 pb-8">
                        <h2 className="text-base font-semibold pb-3 border-b border-gray-500">
                            Tạo nhóm
                        </h2>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <Input
                                register={register}
                                label="Nhập tên nhóm"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />

                            <Select
                                disabled={isLoading}
                                label="Thêm bạn vào nhóm"
                                options={users?.map((user) => ({
                                    value: user._id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Huỷ
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Tạo nhóm
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default GroupModal;