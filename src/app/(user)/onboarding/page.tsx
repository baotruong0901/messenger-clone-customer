import getSession from "@/lib/actions/getSession";
import AccountProfile from "./components/AccountProfile";
import { getCurrentUser } from "@/lib/actions/getCurrentUser.action";
import { redirect } from "next/navigation";

const onBoarding = async () => {
    const session = await getSession()
    const user = await getCurrentUser()

    if (!user) return null;


    if (user.onBoarding) redirect("/conversations");

    const userData = {
        _id: user?._id,
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        avatar: user?.avatar,
        onBoarding: user?.onBoarding,
        description: user?.description
    }
    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="text-2xl font-semibold">
                Onboarding
            </h1>
            <h2 className="mt-3 text-base">
                Complete your profile now to use Message
            </h2>
            <section className="mt-9 text-white bg-slate-900 p-10">
                <AccountProfile
                    user={userData}
                    session={session}
                />
            </section>
        </main>
    );
}

export default onBoarding;