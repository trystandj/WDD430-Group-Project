import React from "react";
import Image from 'next/image'

type Item = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  createdAt: string | Date;
};

interface SellerItemsProps {
  items: Item[];
}

const SellerItems: React.FC<SellerItemsProps> = ({ items }) => {
  return (
    <section className="items-section">
      <h2 className="items-section-title">Items for Sale</h2>
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
    </section>
  );
};

export default SellerItems;
