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
                        <Card key={item.id}
                            name={item.title}
                            tags={item.tags}
                            price={item.price}
                            images={[{
                            src:  item.imageUrl || "https://i0.wp.com/enfermeriacreativa.com/wp-content/uploads/2019/07/placeholder.png?ssl=1",
                            link: `/catalog/${item.id}`
                        }]}>
                            <div className="">
                                <p>$ <span>{item.price}</span></p>
                                <div className="flex flex-wrap gap-[0.25rem]">
                                    {
                                        item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-[#eedb61] text-[#2c2b2a] rounded-md px-[0.5rem] py-[.25rem]">
                                                #{tag}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </Card>
                    </div>)
            }
        </div>
    );
}