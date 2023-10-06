import { getCurrentUser } from "@/lib/actions/getCurrentUser.action"
import DesktopSidebar from "./DesktopSidebar"

export async function Sidebar(
    { children }: { children: React.ReactNode }
) {

    const currentUser = await getCurrentUser()
    return (
        <div className="min-h-screen">
            <DesktopSidebar currentUser={currentUser} />
            <main className="pl-[70px]">
                {children}
            </main>
        </div>
    )

}