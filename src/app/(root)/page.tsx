import Link from "next/link";

const homePage = () => {
    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full flex justify-center items-center  bg-zinc-900">
            <div className="text-center items-center flex flex-col gap-2">
                <h3 className="mt-2 text-3xl font-semibold text-white">
                    Đây là trang chủ
                </h3>
                <Link href={'/conversations'}
                    className="text-gray-300 p-2 bg-white/10 rounded-md hover:bg-white/20"
                >
                    Bắt đầu cuộc trò chuyện
                </Link>
            </div>
        </div>
    );
}

export default homePage;