import { Home } from "@/types/home";

interface HomeBoxProps {
    homes: Home[]
}

const HomeBox = ({ homes }: HomeBoxProps) => {

    if (!homes.length) return <div>Not Found</div>

    return (
        <div>
            <div>
                homeBox
            </div>
            {homes.map((home) => {
                return (
                    <div>
                        <div>
                            {home.price}
                        </div>
                        <div>
                            {`${home.address}, ${home.city}`}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default HomeBox;