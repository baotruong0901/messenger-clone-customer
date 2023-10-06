import BoxMessageSkeletion from "./component/BoxMessageSkeletion";

const Loading = () => {
    return (
        <div className="w-screen">
            <div className="bg-zinc-900 h-full flex flex-col">
                <BoxMessageSkeletion />
            </div>
        </div>
    );
}

export default Loading;