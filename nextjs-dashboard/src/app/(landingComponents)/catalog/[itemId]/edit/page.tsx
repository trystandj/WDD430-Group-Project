import { addItem, fetchItemById, fetchLastItemId, fetchSellerProfiles, updateItem } from "@/app/lib/data";
import { SellerItem, SellerProfile } from "@/app/lib/definitions";
import ItemForm from "@/app/ui/forms/ItemForm";
import { redirect } from "next/navigation";

export default async function EditItemPage({ params }: { params: { itemId: string } }) {
    const itemId = await Number(params.itemId);
    const sellers = await fetchSellerProfiles();
    const item = await fetchItemById(itemId);

    console.log(itemId, item)

    const safeSellers = sellers.map(s => ({
        ...s,
        _id: s?._id?.toString() ?? "",
        userId: s?.userId?.toString() ?? "",
        joinedAt: s.joinedAt?.toISOString() ?? null
    }));


    async function handleSubmit(formData: any) {
        "use server";

        const updatedItem: SellerItem = {
            id: itemId,
            title: formData.get("title") as string,
            price: parseFloat(formData.get("price") as string),
            description: formData.get("description") as string,
            sellerId: formData.get("seller") as number,
            imageUrl: formData.get("imageUrl") as string,
            tags: [formData.get("tags") as string],
            createdAt: item?.createdAt ?? new Date()
        }

        const newItemId = await updateItem(itemId, updatedItem);

        redirect(`/catalog/${newItemId}`);
    }



    return (
        <div className="w-full max-w-[1200px] mx-auto p-[2rem]">
            <h2 className="text-black">Edit Item</h2>
            {
                item && (
                    <ItemForm
                        submit={handleSubmit}
                        sellers={safeSellers as unknown as Array<SellerProfile>}
                        item={item}
                        submitText="Update Item"
                        />
                )
            }
        </div>
    )
}