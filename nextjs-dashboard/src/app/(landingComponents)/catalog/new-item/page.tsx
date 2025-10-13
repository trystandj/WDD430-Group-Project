import { addItem, fetchLastItemId, fetchSellerProfiles } from "@/app/lib/data";
import { SellerItem, SellerProfile } from "@/app/lib/definitions";
import ItemForm from "@/app/ui/forms/ItemForm";
import { redirect } from "next/navigation";

export default async function NewItemPage() {
    const sellers = await fetchSellerProfiles();

    const safeSellers = sellers.map(s => ({
        ...s,
        _id: s?._id?.toString() ?? "",
        userId: s?.userId?.toString() ?? "",
        joinedAt: s.joinedAt?.toISOString() ?? null
    }));


    async function handleSubmit(formData: any) {
        "use server";

        const lastId = await fetchLastItemId() ?? 0;

        const item: SellerItem = {
            id: lastId + 1,
            title: formData.get("title") as string,
            price: parseFloat(formData.get("price") as string),
            description: formData.get("description") as string,
            sellerId: formData.get("seller") as number,
            imageUrl: formData.get("imageUrl") as string,
            tags: [formData.get("tags") as string],
            createdAt: new Date()
        }

        const newItemId = await addItem(item);

        redirect(`/catalog/${newItemId}`);
    }



    return (
        <div className="w-full max-w-[1200px] mx-auto p-[2rem]">
            <h2 className="text-black">New Item</h2>
            <ItemForm
                submit={handleSubmit}
                sellers={safeSellers as unknown as Array<SellerProfile>}
                submitText="Add New Item"/>
        </div>
    )
}