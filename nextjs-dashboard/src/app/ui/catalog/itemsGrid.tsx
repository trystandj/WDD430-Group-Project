import { fetchSellerItems } from "@/app/lib/data";
import Card from "@/app/ui/card/Card";


export default async function ItemsGrid ({
    query,
    currentPage
}: {
    query: string;
    currentPage: number;
}) {
    const items = await fetchSellerItems(query, currentPage);

    return (
        <div className="text-black m-auto grid gap-[1rem] md:grid-cols-3" id="sellers-container">
            {
                items.map((item, index) =>
                    <div key={index} className="flex justify-center">
                        <Card key={item.id} name={item.title} images={[{
                            src:  item.imageUrl || "https://i0.wp.com/enfermeriacreativa.com/wp-content/uploads/2019/07/placeholder.png?ssl=1",
                            link: `/items/${item.id}`
                        }]} />
                    </div>)
            }
        </div>
    );
}