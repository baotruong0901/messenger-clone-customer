import { Suspense } from "react";
import ConversationSkeletion from "../conversations/component/ConversationSkeleton";
import User from "./components/User";


export default async function Layout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="flex h-full">
            <Suspense fallback={<div className="md:w-80 w-20">
                <ConversationSkeletion />
            </div>}>
                <div className="overflow-y-auto border-r border-gray-700 md:w-80 w-20 pb-20 bg-black/90">
                    <User />
                </div>
            </Suspense>
            {children}
        </div>
    );
}