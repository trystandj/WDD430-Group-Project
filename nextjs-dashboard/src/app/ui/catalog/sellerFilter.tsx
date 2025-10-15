"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Seller {
  id: number;
  name: string;
}

interface SellerFilterProps {
  sellers: Seller[];
}

export default function SellerFilter({ sellers }: SellerFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedSeller, setSelectedSeller] = useState(searchParams.get("sellerId") || "");

  useEffect(() => {
    setSelectedSeller(searchParams.get("sellerId") || "");
  }, [searchParams]);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    
    if (selectedSeller) {
      params.set("sellerId", selectedSeller);
    } else {
      params.delete("sellerId");
    }
    
    params.set("page", "1");
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sellerId");
    params.set("page", "1");
    
    setSelectedSeller("");
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="seller-filter-container">
      <span className="seller-filter-label">Filter by Seller:</span>
      
      <div className="seller-filter-select-group">
        <select
          value={selectedSeller}
          onChange={(e) => setSelectedSeller(e.target.value)}
          className="seller-filter-select"
        >
          <option value="">All Sellers</option>
          {sellers.map((seller) => (
            <option key={seller.id} value={seller.id}>
              {seller.name}
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={handleFilter} className="seller-filter-apply-button">
        Apply
      </button>
      
      <button onClick={handleClear} className="seller-filter-clear-button">
        Clear
      </button>
    </div>
  );
}