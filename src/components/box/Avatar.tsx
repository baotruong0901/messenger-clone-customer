import { User } from "@/lib/types/user";
import Image from "next/image";

interface Props {
    user?: User,
    className?: string
}

const Avatar = ({ user, className }: Props) => {

    return (
        <div className="relative">
            <div className={`relative border border-gray-700 inline-block rounded-full overflow-hidden ${className ? className : 'w-9 h-9'}`}>
                <Image
                    fill
                    src={user?.avatar || '/images/placeholder.jpg'}
                    alt="Avatar"
                />
            </div>
            <span className="absolute rounded-full bg-green-500 bottom-1  -translate-y-1/4 right-0 h-3 w-3"
            />
        </div>
    );
}

export default Avatar;