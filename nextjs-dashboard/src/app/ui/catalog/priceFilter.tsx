"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PriceFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    
    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }
    
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }
    
    params.set("page", "1");
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");
    
    setMinPrice("");
    setMaxPrice("");
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="price-filter-container">
      <span className="price-filter-label">Price Range:</span>
      
      <div className="price-filter-input-group">
        <label className="price-filter-input-label">Min:</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="$0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="price-filter-input"
        />
      </div>
      
      <div className="price-filter-input-group">
        <label className="price-filter-input-label">Max:</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="$∞"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="price-filter-input"
        />
      </div>
      
      <button onClick={handleFilter} className="price-filter-apply-button">
        Apply
      </button>
      
      <button onClick={handleClear} className="price-filter-clear-button">
        Clear
      </button>
    </div>
  );
}