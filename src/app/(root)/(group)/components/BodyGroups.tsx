import { Conversation } from "@/lib/types/conversation";
import ConversationCard from "./ConversationCard"

interface Props {
    groups: Conversation[]
}

const BodyGroups = ({ groups }: Props) => {
    return (
        <section>
            <div className="flex flex-col gap-2 md:pb-0 pb-14">
                {groups?.length === 0 ? (
                    <div className="flex flex-col gap-4 w-full items-center ">
                        <p className="text-[14px] text-gray-300">Không tìm thấy kết quả</p>
                        <p className="text-[14px] text-gray-500">Vui lòng thử lại từ khoá khác</p>
                    </div>
                ) : (
                    <>
                        {groups.map((item: Conversation) => (
                            <ConversationCard
                                key={item._id}
                                data={item}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}

export default BodyGroups;