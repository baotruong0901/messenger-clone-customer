import BoxMessageSkeletion from "./component/BoxMessageSkeletion";

const Loading = () => {
    return (
        <div className="bg-zinc-900 flex-1 flex flex-col">
            <BoxMessageSkeletion />
        </div>
    );
}

export default Loading;