import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileItemProps {
    href: string;
    icon: any;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    onClick
}) => {
    const pathname = usePathname()
    let active
    if (href === '/users') {
        active = ((pathname?.includes(href) && href.length > 1) || pathname === href) || pathname === '/groups'
    } else {
        active = ((pathname?.includes(href) && href.length > 1) || pathname === href)
    }

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (

        <Link
            onClick={handleClick}
            href={href}
            className={`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-300 hover:bg-white/10 ${active && 'bg-white/[0.05]'}`}>
            <Icon className="h-6 w-6" />
        </Link>
    );
}

export default MobileItem;