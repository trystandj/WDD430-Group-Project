import { addItem, fetchLastItemId, fetchSellerProfiles } from "@/app/lib/data";
import { SellerItem, SellerProfile } from "@/app/lib/definitions";
import ItemForm from "@/app/ui/forms/ItemForm";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function NewItemPage() {
    const sellers = await fetchSellerProfiles();

    const safeSellers = sellers.map(s => ({
        ...s,
        _id: s?._id?.toString() ?? "",
        userId: s?.userId?.toString() ?? "",
        joinedAt: s.joinedAt?.toISOString() ?? null
    }));


    async function handleSubmit(formData: FormData) {
        "use server";

        const lastId = await fetchLastItemId() ?? 0;

        const sellerValue = formData.get("seller");
        if (!sellerValue) {
            throw new Error("Seller is required");
        }

        const item: SellerItem = {
            id: lastId + 1,
            title: formData.get("title") as string,
            price: parseFloat(formData.get("price") as string),
            description: formData.get("description") as string,
            sellerId: +sellerValue,
            imageUrl: formData.get("imageUrl") as string,
            tags: [formData.get("tags") as string],
            createdAt: new Date()
        }

        const newItemId = await addItem(item);

        redirect(`/catalog/${newItemId}`);
    }



    return (
        <div className="w-full max-w-[1200px] mx-auto p-[2rem]">
            <h2 className="login-title">New Item</h2>
            <Suspense fallback={<div className="text-center py-10">Loading form...</div>}>
                <ItemForm
                    submit={handleSubmit}
                    sellers={safeSellers as unknown as Array<SellerProfile>}
                    submitText="Add New Item"/>
            </Suspense>
        </div>
    )
}