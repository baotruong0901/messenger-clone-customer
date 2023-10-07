import { Suspense } from "react";
import ConversationSkeletion from "./component/ConversationSkeleton";
import Conversations from "./component/Conversations";

export default async function Layout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="flex h-full">
            <Suspense fallback={<ConversationSkeletion />}>
                <Conversations />
            </Suspense>
            {children}
        </div>
    );
}