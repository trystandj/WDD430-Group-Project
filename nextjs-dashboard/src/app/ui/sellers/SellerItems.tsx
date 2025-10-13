import React from "react";
import Image from "next/image";
import Link from "next/link";

type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdAt: string | Date;
};

interface SellerItemsProps {
  items: Item[];
  sellerId: string;
  isProfilePage?: boolean; 
}

const SellerItems: React.FC<SellerItemsProps> = ({ items, sellerId, isProfilePage = false }) => {
  return (
    <section className="items-section">
      <h2 className="items-section-title">Items for Sale</h2>

     
      {isProfilePage && (
        <Link href={`/catalog/new-item?sellerId=${sellerId}`}>
          <button className="text-black border border-[var(--primary)] bg-[var(--primary)] px-5 py-2 mb-3 rounded-md hover:cursor-pointer hover:brightness-80">
            Create Item
          </button>
        </Link>
      )}

      <div className="items-grid">
        {items && items.length > 0 ? (
          items.map((item, idx) => (
            <div key={idx} className="item-card">
              <Image
                src={item.imageUrl}
                alt={item.title}
                className="item-image"
                width={400}
                height={300}
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

                <div className="flex justify-between items-center">
                  <p className="item-date">
                    Listed on {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                 
                  {isProfilePage && (
                    <Link href={`/catalog/${item.id}/edit`}>
                      <button className="text-black border border-[var(--primary)] bg-[var(--primary)] px-5 py-2 rounded-md hover:cursor-pointer hover:brightness-80">
                        Edit Item
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No items listed yet.</p>
        )}
      </div>
    </section>
  );
};

export default SellerItems;
