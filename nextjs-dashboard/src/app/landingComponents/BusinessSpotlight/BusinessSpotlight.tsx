"use client";
import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";
import { spotlightData } from "./spotlightData";

export default function BusinessSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === spotlightData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentBusiness = spotlightData[currentIndex];

  return (
    <section className="relative bg-gray-50 flex flex-col items-center justify-center h-[800px] overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Business Spotlight
      </h2>
      <div className="flex justify-center w-full max-w-4xl px-6">
        <SpotlightCard
          name={currentBusiness.name}
          description={currentBusiness.description}
          images={currentBusiness.images}
        />
      </div>
    </section>
  );
}
