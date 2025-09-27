import { fetchSellerById } from "@/lib/data";
import { notFound } from "next/navigation";
import './seller-detail.css';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = await fetchSellerById(id);

  if (!seller) {
    notFound();
  }

  return (
    <main className="seller-detail-page">
      <div className="seller-profile-card">
        <div className="seller-header">
          <img
            src={seller.avatarUrl}
            alt={seller.name}
            className="seller-profile-avatar"
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

        <h2 className="items-section-title">Items for Sale</h2>
        <div className="items-grid">
          {seller.items && seller.items.length > 0 ? (
            seller.items.map((item, idx) => (
              <div key={idx} className="item-card">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-content">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <div className="item-tags">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="item-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="item-date">
                    Listed on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">No items listed yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}