"use client"

import { InputSearch } from "@/components/ui/inputSearch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    routeType: string,
    data?: string
}

const Searchbar = ({ routeType, data }: Props) => {
    const router = useRouter()
    const [search, setSearch] = useState<string>(data || "")
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                router.push(`/${routeType}?q=${search}`)
            } else {
                router.push(`/${routeType}`)
            }
        }, 300)
        return () => clearTimeout(delayDebounceFn)
    }, [search, routeType, router])
    return (
        <div className="flex bg-black/20 px-4 py-2 mb-4 rounded-lg">
            <Image
                src={'/images/search-gray.svg'}
                alt="search icon"
                width={24}
                height={24}
                className="object-contain"
            />
            <InputSearch
                id="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder={`${routeType !== "users" ? "Tìm nhóm" : "Tìm bạn"}`}
                className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none outline-none text-base"
            />
        </div>
    );
}

export default Searchbar;