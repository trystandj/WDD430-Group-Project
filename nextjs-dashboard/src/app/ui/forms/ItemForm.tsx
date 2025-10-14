
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CTAButton from "../components/CTAButton";
import { SellerItem, SellerProfile } from "@/app/lib/definitions";
import { FormEvent } from "react";

interface ItemFormProps {
    submit: (formData: FormData) => Promise<void>;
    item?: SellerItem;
    sellers: SellerProfile[];
    submitText: string;
}

export default function ItemForm({ submit, sellers, item, submitText }: ItemFormProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        await submit(formData);
    }

    const handleBackClick = () => {
        router.back();
    }

    return (
        <form className="flex flex-col gap-4 px-10 py-5 bg-white rounded-xl" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title" className="text-black">*Title</label>
                    <input
                        id="title"
                        name="title"
                        className="login-input w-full"
                        type="text"
                        placeholder="JJ Inc. example"
                        defaultValue={ item?.title ?? "" }
                        required/>
                </div>
                <div>
                    <label htmlFor="price" className="text-black">*Price $</label>
                    <input
                        id="price"
                        name="price"
                        className="login-input w-full" 
                        type="float" placeholder="1.00"
                        defaultValue={ item?.price ?? "" }
                        required/>
                </div>
                <div>
                    <label htmlFor="description" className="text-black">*Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        className="login-input w-full" 
                        placeholder="Sample description..."
                        defaultValue={ item?.description ?? "" }
                        required/>
                </div>
                <div>
                    <label htmlFor="seller" className="text-black">*Seller</label>
                    <select
                        id="seller"
                        name="seller"
                        className="login-input w-full"
                        defaultValue={item?.sellerId ?? searchParams.get("sellerId") ?? ""} required>
                        <option key="-1" value="" disabled>--- Select a Seller ---</option>
                        {
                            sellers.map((seller) => (
                                <option key={seller.id} value={seller.id}>{seller.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="text-black">Image URL</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        className="login-input w-full"
                        type="text"
                        placeholder="https://www.sample.com/"
                        defaultValue={ item?.imageUrl ?? "" } />
                </div>
                <div>
                    <label htmlFor="tags" className="text-black">tags</label>
                    <input
                        id="tags"
                        name="tags"
                        className="login-input w-full"
                        type="text"
                        placeholder="Ceramics"
                        defaultValue={ item?.tags ?? "" }/>
                </div>
                <div className="grid gap-5 md:flex md:justify-between pt-3">
                    <button
                        className="text-black bg-gray-300 px-10 py-2 border rounded-md hover:cursor-pointer hover:bg-gray-400"
                        onClick={handleBackClick}
                    >Cancel</button>
                    <CTAButton className="row-start-1" type="submit">{submitText}</CTAButton>
                </div>
            </form>
    )
}