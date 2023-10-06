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

                <User />

            </Suspense>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}