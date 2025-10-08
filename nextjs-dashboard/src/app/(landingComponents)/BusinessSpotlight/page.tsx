"use client";
import { useState, useEffect } from "react";

import { spotlightData } from "./spotlightData";
import styles from "./Card.module.css";
import Image from "next/image";

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

 

  return (
    <section className={styles.BusinessSpotlight}>

      
      <div className={styles.Card_Container}>
        {/* Header */}
        {/* Hero Image */} 
      
        <header>
          <Image

          src="/hero.jpg"
          alt="Hero image"
          width={699} //3 233
          height={466} //2
          fetchPriority="high"
          className="hidden md:block"
        />
          
        </header>
      </div>
    </section>
  );
}