'use client'; 

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/ui/card/card.module.css";
import "@/app/(landingComponents)/sellers/[id]/seller-detail.css";
import SellerItems from "@/app/ui/sellers/SellerItems";

export default function ItemSpotlightUI() {
  const [items, setItems] = useState([]);      
  const [loading, setLoading] = useState(true); 

 
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); 

  if (loading) {
    return <p className="text-gray-500">Loading items...</p>;
  }

  if (!items || items.length === 0) {
    return (
      <section className={styles.BusinessSpotlight}>
        <div className={styles.Card_Container}>
          <header>
            <Image
              src="/hero.jpg"
              alt="Hero image"
              width={699}
              height={466}
              fetchPriority="high"
              className="hidden md:block"
            />
            <span className="uppercase text-sm tracking-widest text-gray-500">
              Item Spotlight
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Browse Some of Our Featured Items
            </h2>
          </header>
          <p className="text-gray-600 mt-4">No items available at the moment.</p>
        </div>
      </section>
    );
  }

  
  const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <section className={styles.BusinessSpotlight}>
      <div className={styles.Card_Container}>
       

        <SellerItems items={randomItems} sellerId={""} />
      </div>
    </section>
  );
}
