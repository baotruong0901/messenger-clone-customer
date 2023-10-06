
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    href: string;
    icon: any;
    label: string;
    onClick?: () => void
}
const DesktopItem = ({ href, icon: Icon, label, onClick }: Props) => {
    const pathname = usePathname()
    let active
    if (href === '/users') {
        active = ((pathname?.includes(href) && href.length > 1) || pathname === href) || pathname === '/groups'
    } else {
        active = ((pathname?.includes(href) && href.length > 1) || pathname === href)
    }

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return (
        <li
            onClick={handleClick}
            className="group relative">
            <Link
                href={href}
                className={`relative flex gap-x-3 rounded-md px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 ${active && 'bg-white/[0.05]'}`}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">
                    {label}
                </span>
            </Link>
            <span className="absolute group-hover:opacity-100 p-1 -right-1/2 -bottom-full transform -translate-y-full translate-x-1/4 rounded-sm text-[10px] text-white opacity-0 bg-black/80 transition ease-out duration-500">
                {label}
            </span>
        </li>
    );
}

export default DesktopItem;