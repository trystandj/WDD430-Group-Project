import Search from "@/app/ui/Search";
import { fetchItemsAmount, fetchSellerProfiles } from "@/app/lib/data";
import ItemsGrid from "@/app/ui/catalog/itemsGrid";
import Pagination from "@/app/ui/Pagination";
import PriceFilter from "@/app/ui/catalog/priceFilter";
import SellerFilter from "@/app/ui/catalog/sellerFilter";

export default async function CatalogPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        minPrice?: string;
        maxPrice?: string;
        sellerId?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : undefined;
    const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined;
    const sellerId = searchParams?.sellerId ? Number(searchParams.sellerId) : undefined;
    
    const sellers = await fetchSellerProfiles();
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
            
            <div className="mb-6 space-y-4">
                <PriceFilter />
                <SellerFilter sellers={sellers} />
            </div>

            <div>
                <ItemsGrid 
                    query={query} 
                    currentPage={currentPage}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    sellerId={sellerId}
                />
            </div>
            
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
