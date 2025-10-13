import { fetchSellerById, fetchItemsBySellerId, fetchStoriesBySellerId } from "../../../lib/data";
import { notFound } from "next/navigation";
import Image from 'next/image'
import "./seller-detail.css";
import SellerItems from "../../../ui/sellers/SellerItems";
import SellerStory from "../../../ui/sellers/SellerStory";


export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const seller = await fetchSellerById(id);
  if (!seller) {
    notFound();
  }

  const items = await fetchItemsBySellerId(seller.id);
  const stories = await fetchStoriesBySellerId(seller.id);

  return (
    <main className="seller-detail-page">
      <div className="seller-profile-card">
        <div className="seller-header">
          <Image
            src={seller.avatarUrl || "/images/spoons.webp"}
            alt={seller.name}
            className="seller-profile-avatar"
            width={120}
            height={120}
          />
          <div className="seller-info">
            <h1 className="seller-profile-name">{seller.name}</h1>
            <p className="seller-profile-bio">{seller.bio}</p>
            <p className="seller-meta">
              📍 {seller.location} · Joined{" "}
              {new Date(seller.joinedAt).toLocaleDateString()}
            </p>
            <p className="seller-email">{seller.email}</p>
          </div>
        </div>

        <SellerStory stories={stories} />
        <SellerItems items={items} sellerId={id} />
      </div>
    </main>
  );
}
