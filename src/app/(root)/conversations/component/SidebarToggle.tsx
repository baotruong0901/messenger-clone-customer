import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileItemProps {
    href: string;
    icon: any;
    onClick?: () => void;
    label: string
}

const SidebarToggle: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    onClick,
    label
}) => {

    const pathname = usePathname()
    let active = false
    if (href === '/users') {
        active = ((pathname?.includes(href) && href.length > 1) || pathname === href) || pathname === '/groups'
    } else {
        active = ((pathname?.includes(href) && href.length > 1) || pathname === href)
    } active = ((pathname?.includes(href) && href.length > 1) || pathname === href)

    console.log(active);

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };


    return (
        <Link
            onClick={handleClick}
            href={href}
            className={`flex gap-5 leading-6 font-semibold w-full p-4 text-gray-300 hover:bg-white/10
            ${active! && 'bg-white/[0.05]'}
            `}>
            <Icon className="h-8 w-8" />
            <span className="text-xl">
                {label}
            </span>
        </Link>
    );
}

export default SidebarToggle;