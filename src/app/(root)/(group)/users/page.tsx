import { HiOutlineUsers } from 'react-icons/hi2';
import { getUsers } from '@/lib/actions/getUsers.action';
import Searchbar from '../components/Searchbar';
import BodyLayout from '../components/BodyLayout';

const PageUser = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {

    const users = await getUsers({
        searchString: searchParams.q,
        pageNumber: 1,
        pageSize: 25,
    })

    return (
        <div className="bg-zinc-900 text-gray-300 flex-1 flex flex-col">
            <div className="flex items-center gap-3 border-b border-gray-700 h-[70px] py-3 px-4 sm:px-4 lg:px-6">
                <HiOutlineUsers size={24} />
                <span>Danh sách bạn bè</span>
            </div>
            <div className='py-3 px-4 sm:px-4 lg:px-6'>
                <Searchbar routeType='users'
                    data={searchParams.q!}
                />
            </div>
            <div className='py-3 px-4 sm:px-4 lg:px-6 flex-1 overflow-y-auto'>
                <BodyLayout users={users} />
            </div>
        </div>
    );
}

export default PageUser;