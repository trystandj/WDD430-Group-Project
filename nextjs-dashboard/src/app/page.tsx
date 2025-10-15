"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CTAButton from "./ui/components/CTAButton";
import ItemSpotlightUI from "./(landingComponents)/ItemSpotlight/page";
import HeroImage from "./ui/HeroImage";



export default function Home() {
  
  const heroImages = [
    {
      src: "/hero.jpg",
      alt: "Woodworking tools on a bench",
      heading: "Crafted With Passion",
      subheading:
        "Explore handmade creations built with care and precision by local artisans.",
    }
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroImage images={heroImages} interval={8000} />

         <section className={styles.BusinessSpotlight}>
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

       
        <div className="mt-12">
          <ItemSpotlightUI />
          
        </div>

        {<div className="hero-content flex flex-col items-center justify-center text-center gap-4">
         <h1 className="text-4xl font-bold">Welcome to Our Marketplace!</h1>
         <p className="text-lg text-gray-600">Find amazing sellers or start selling today.</p>
         <CTAButton text="Get Started" onClick={() => window.location.href = '/signup'} />
         </div>}
      </main>

    </div>
  );
}
