"use client"

import useConversation from "@/hook/useConversation";
import { Skeleton } from "@mui/material";

const ConversationSkeletion = () => {
    const { isOpen } = useConversation()

    const skeletonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    };

    return (
        <>
            <div className={`${isOpen ? "hidden" : "w-full"} md:block md:w-80 border-r border-gray-700 pb-20 bg-black/90 h-full`}>
                <div className="flex items-center justify-between p-4 px-3 md:px-4">
                    <div className="block md:hidden">
                        <Skeleton animation="wave" variant="rounded" height={35} width={40} style={skeletonStyle} />
                    </div>
                    <div>
                        <Skeleton animation="wave" variant="rounded" height={35} width={70} style={skeletonStyle} />
                    </div>
                    <div>
                        <Skeleton variant="circular" width={30} height={30} style={skeletonStyle} />
                    </div>
                </div>
                {[... new Array(6)].map((index) => (
                    <div
                        key={index}
                        className="mx-2 flex items-center justify-center w-full gap-4 p-2"
                    >
                        <div>
                            <Skeleton variant="circular" width={50} height={50} style={skeletonStyle} />
                        </div>
                        <div className="flex flex-col w-full flex-1">
                            <Skeleton animation="wave" variant="text" height={30} width={'120px'} style={skeletonStyle} />
                            <Skeleton animation="wave" variant="text" height={30} width={'200px'} style={skeletonStyle} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ConversationSkeletion;