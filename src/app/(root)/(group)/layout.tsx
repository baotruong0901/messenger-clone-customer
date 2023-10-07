import { Suspense } from "react";
import ConversationSkeletion from "../conversations/component/ConversationSkeleton";
import User from "./components/User";


export default async function Layout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="flex h-screen">
            <Suspense fallback={
                <ConversationSkeletion />
            }>
                <User />
            </Suspense>
            {children}
        </div>
    );
}