import Search from "@/app/ui/Search";
import { fetchItemsAmount } from "@/app/lib/data";
import ItemsGrid from "@/app/ui/catalog/itemsGrid";
import Pagination from "@/app/ui/Pagination";
import Link from "next/link";


export default async function CatalogPage(props: {
    searchParams?:Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchItemsAmount(query);

    return (
        <div className="w-full max-w-[1200px] mx-auto p-[2rem]">
            <div className="grid grid-cols-2 mb-[2.5rem]">
                <div>
                    <h1 className="text-[2.5rem] font-bold text-black">Catalog</h1>
                    
                </div>
                <div className="flex items-center">
                    <Search placeholder="search items..." />
                </div>
            </div>
            <div>
                <ItemsGrid query={query} currentPage={currentPage} />
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}