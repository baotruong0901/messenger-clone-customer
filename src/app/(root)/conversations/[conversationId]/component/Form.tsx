"use client"

import useConversation from "@/hook/useConversation";
import { createMessage } from "@/lib/actions/createMessage.action";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillLike } from "react-icons/ai";
import { HiPhoto } from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";

const Form = () => {
    const { conversationId } = useConversation()
    const session = useSession()
    const [isMessageEmpty, setIsMessageEmpty] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: "",
        }
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("message", e.target.value);
        // Kiểm tra xem giá trị có rỗng không
        setIsMessageEmpty(e.target.value.trim() === "");
    };
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setValue('message', '', { shouldValidate: true })
        setIsMessageEmpty(true);
        await createMessage({ ...data }, conversationId, session?.data?.tokens?.accessToken)
    }

    const handleSentLike = async () => {
        await createMessage({ like: "true" }, conversationId, session?.data?.tokens?.accessToken)
    }

    const handleFileChange = async (event: any) => {
        const selectedFile = event.target.files[0];
        await createMessage({ image: selectedFile }, conversationId, session?.data?.tokens?.accessToken)
    };
    return (
        <div className="bg-zinc-900 flex items-center flex-shrink-0 justify-between gap-2 p-4">
            <label htmlFor="fileInput" className="cursor-pointer">
                <HiPhoto size={30} className="text-blue-700" />
            </label>
            <input
                hidden
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleFileChange}
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 w-full"
            >
                <div className="relative w-full">
                    <input
                        id="message"
                        autoComplete={"off"}
                        {...register("message", { required: true })}
                        placeholder="Write a message..."
                        required
                        className="text-white font-light bg-white/10 w-full py-2 px-4 rounded-full focus:outline-none"
                        onChange={handleInputChange}
                    />
                </div>
                {isMessageEmpty ? (
                    <div className="cursor-pointer" onClick={() => handleSentLike()}>
                        <AiFillLike size={24} className="text-blue-700" />
                    </div>
                ) : (
                    <button type="submit">
                        <IoMdSend size={24} className="text-blue-700" />
                    </button>
                )}
            </form>
        </div>
    );
}

export default Form;