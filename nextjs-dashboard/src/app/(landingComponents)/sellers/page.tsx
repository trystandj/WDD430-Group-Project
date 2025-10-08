import { fetchSellerProfiles } from "../../lib/data";
import Link from "next/link";
import Image from 'next/image'
import './sellers.css';

export default async function SellersPage() {
  const sellers = await fetchSellerProfiles();

  return (
    <main className="sellers-page">
      <div className="sellers-header">
        <h1 className="sellers-title">Sellers</h1>
        <div className="view-toggle">
          <button className="view-btn active" data-view="grid">Grid View</button>
          <button className="view-btn" data-view="gallery">Gallery View</button>
        </div>
      </div>
      
      <div className="sellers-container grid-view" id="sellers-container">
        {sellers.length > 0 ? (
          sellers.map((seller) => (
            <Link
              key={seller.id}
              href={`/sellers/${seller.id}`}
              className="seller-card"
            >
              <div className="seller-content">
                <Image
                  src={seller.avatarUrl ?? '/images/spoons.webp'}
                  alt={seller.name}
                  className="seller-avatar"
                  width={80}
                  height={80}
                />
                <h2 className="seller-name">{seller.name}</h2>
                <p className="seller-bio">{seller.bio}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-sellers">No sellers found.</p>
        )}
      </div>
    </main>
  );
}