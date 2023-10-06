import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    href: string;
    icon: any;
    label: string
}

const UserItem = ({
    href,
    label,
    icon: Icon }: Props) => {

    const pathname = usePathname()

    const active = (pathname?.includes(href) && href.length > 1) || pathname === href
    return (
        <li className="group">
            <Link
                href={href}
                className={`relative flex items-center gap-5 p-4 font-semibold text-white  ${active ? 'hover:bg-white/10 bg-white/10' : 'hover:bg-white/5'}`}
            >
                <Icon className="h-6 md:w-6" />
                <span className="">
                    {label}
                </span>
            </Link>
        </li>
    );
}

export default UserItem;