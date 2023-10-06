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
                className={`relative flex items-center gap-0 md:gap-5 p-4 text-sm font-semibold text-white  ${active ? 'hover:bg-white/10 bg-white/10' : 'hover:bg-white/5'}`}
            >
                <Icon className="h-6 md:w-6 w-full shrink-0" />
                <span className="md:block hidden">
                    {label}
                </span>
            </Link>
        </li>
    );
}

export default UserItem;