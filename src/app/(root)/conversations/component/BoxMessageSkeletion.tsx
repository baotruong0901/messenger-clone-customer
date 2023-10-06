import { Skeleton } from "@mui/material";

const BoxMessageSkeletion = () => {

    const skeletonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    };

    const DesiredIndexes = [1, 2, 4, 5, 7, 8, 10]
    const DesiredIndexes_2 = [2, 5, 8, 10]

    return (
        <>
            <div className="flex items-center justify-between border-b border-gray-700 py-2 px-4 sm:px-4 lg:px-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Skeleton animation="wave" variant="text" height={30} width={30} style={skeletonStyle} />
                        <Skeleton variant="circular" width={45} height={45} style={skeletonStyle} />
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <Skeleton animation="wave" variant="text" height={30} width={80} style={skeletonStyle} />
                        </div>
                        <span className="text-sm font-light text-neutral-500">
                            <Skeleton animation="wave" variant="text" height={30} width={150} style={skeletonStyle} />
                        </span>
                    </div>

                </div>
                <div>
                    <Skeleton animation="wave" variant="rounded" height={20} width={50} style={skeletonStyle} />
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-end">
                <div className="mt-2 relative">
                    {[... new Array(12)].map((_, index) => (
                        <div
                            key={`${index}-"sketetion"`}
                            className={`flex px-4 ${DesiredIndexes.includes(index) ? '' : 'justify-end'} py-[2px] `}>
                            {DesiredIndexes_2.includes(index) &&
                                <div className="absolute">
                                    <Skeleton variant="circular" width={45} height={45} style={skeletonStyle} />
                                </div>
                            }
                            <div className={`items-end ${DesiredIndexes.includes(index) ? 'px-12' : ''}`}>
                                <div className={`flex flex-col bg-white/10 rounded-xl py-1 px-3`}>
                                    <div>
                                        <Skeleton animation="wave" variant="text" height={20} width={80} style={skeletonStyle} />
                                    </div>
                                    <div >
                                        <Skeleton animation="wave" variant="text" height={15} width={40} style={skeletonStyle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2 w-full p-4">
                <Skeleton variant="circular" width={30} height={30} style={skeletonStyle} />
                <form
                    className="flex items-center gap-2 w-full"
                >

                    <Skeleton animation="wave" variant="rounded" height={40} width={"100%"} style={{ ...skeletonStyle, borderRadius: '20px' }} />

                    <div>
                        <Skeleton variant="circular" width={30} height={30} style={skeletonStyle} />

                    </div>
                </form>
            </div>
        </>
    );
}

export default BoxMessageSkeletion;