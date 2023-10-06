import { HiOutlineUserGroup } from 'react-icons/hi2';
import Searchbar from '../components/Searchbar';
import { getConversations } from '@/lib/actions/getConversations.action';
import BodyGroups from '../components/BodyGroups';

const PageGroups = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const groups = await getConversations({
        searchString: searchParams.q,
        isGroup: true
    })
    return (
        <div className="bg-zinc-900 text-gray-300 flex-1 flex flex-col">
            <div className="flex items-center gap-3 border-b border-gray-700 h-[70px] py-3 px-4 sm:px-4 lg:px-6">
                <HiOutlineUserGroup size={24} />
                <span>Danh sách nhóm</span>
            </div>
            <div className='py-3 px-4 sm:px-4 lg:px-6'>
                <Searchbar routeType='groups'
                    data={searchParams.q!}
                />
            </div>
            <div className='py-3 px-4 sm:px-4 lg:px-6 flex-1 overflow-y-auto'>
                <BodyGroups groups={groups} />
            </div>
        </div>
    );
}

export default PageGroups;