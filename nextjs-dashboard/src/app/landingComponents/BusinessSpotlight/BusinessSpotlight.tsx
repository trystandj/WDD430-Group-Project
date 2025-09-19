"use client";
import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";
import { spotlightData } from "./spotlightData";
import styles from "./Card.module.css";

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
    <section className={styles.BusinessSpotlight}>
      <div className={styles.Card_Container}>
        {/* Header */}
        <header>
          <span className="uppercase text-sm tracking-widest text-gray-500">
            Item Spotlight
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Browse Some of Our Featured Items
          </h2>
        </header>

        {/* Cards grid */}
        <div>
          {currentBusiness.images.slice(0, 6).map((imageData, idx) => (
            <div
              key={idx}
              data-card="true"
            >
              <SpotlightCard
                name={currentBusiness.name}
                description={currentBusiness.description}
                images={[imageData]} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}