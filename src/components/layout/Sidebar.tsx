import { getCurrentUser } from "@/lib/actions/getCurrentUser.action"
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

export async function Sidebar(
    { children }: { children: React.ReactNode }
) {

    const currentUser = await getCurrentUser()
    return (
        <div className="h-screen">
            <DesktopSidebar currentUser={currentUser} />
            <MobileFooter />
            <main className="md:pl-[70px]">
                {children}
            </main>
        </div>
    )

}