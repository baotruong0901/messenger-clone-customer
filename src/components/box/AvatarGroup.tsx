import { User } from "@/lib/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
    users?: User[]
}

const AvatarGroup = ({ users }: Props) => {
    const sliceUsers = users?.slice(1, 3)

    const positionMap = {
        0: "top-0 right-0 z-20 ring-2 ring-zinc-900",
        1: "bottom-0 left-0  z-10"
    }

    return (
        <div className="relative h-11 w-11">
            {sliceUsers?.map((user, index) => (
                <div
                    key={user._id}
                    className={`absolute inline-block rounded-full overflow-hidden h-[28px] w-[28px] ${positionMap[index as keyof typeof positionMap]}`}
                >
                    <Image
                        alt="Avatar"
                        fill
                        src={user?.avatar || "/images/placeholder.jpg"}
                    />
                </div>
            ))}
        </div>
    );
}

export default AvatarGroup;