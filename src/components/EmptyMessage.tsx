const EmptyMessage = () => {
    return (
        <div className="bg-zinc-900 flex-1 flex justify-center items-center px-8">
            <div className="flex flex-col text-center">
                <h3 className="text-2xl font-semibold text-white">
                    Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
                </h3>
            </div>
        </div>
    );
}

export default EmptyMessage;