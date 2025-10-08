"use client";
import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";
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

  const currentBusiness = spotlightData[currentIndex];

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
      
      <div className={styles.Bus_Spot}>
          <span className="uppercase text-sm tracking-widest text-gray-500">
            Business Spotlight
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Our purpose as a Business
          </h2>
            <p> 
              Here at Handcraft Haven, our purpose is to create goods by hand traditionally. We work hard to <br />gather these recipes and instructions for a good handcrafted feel.<br />
            </p>

          <span className="uppercase text-sm tracking-widest text-gray-500">
            Customer Spotlight
          </span>
          <div className={styles.Spotlight_Card}>
            <Image
              src="/stockperson.jpg"
              alt="Hero image"
              width={150} 
              height={150} 
              fetchPriority="high"
              className={`${styles.Rounded_Image} hidden md:block`}
            />
            
          <div>
          
          Handcraft Haven gave me the best opportunity to enjoy handcrafted goods! It was an unforgetable experience that resonated with me.<br /><br />
          - Alyssa 
          </div>
          </div>
        </div>
      

    </section>
  );
}