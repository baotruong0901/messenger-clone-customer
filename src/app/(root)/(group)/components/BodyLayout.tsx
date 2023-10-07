import { User } from "@/lib/types/user";
import UserCard from "./UserCard";

interface Props {
    users: User[]
}

const BodyLayout = ({ users }: Props) => {
    return (
        <section>
            <div className="flex flex-col gap-2 mb-14">
                {users?.length === 0 ? (
                    <div className="flex flex-col gap-4 w-full items-center ">
                        <p className="text-[14px] text-gray-300">Không tìm thấy kết quả</p>
                        <p className="text-[14px] text-gray-500">Vui lòng thử lại từ khoá khác</p>
                    </div>
                ) : (
                    <>

                        {users?.map((user: User) => (
                            <UserCard
                                key={user._id}
                                data={user}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}

export default BodyLayout;