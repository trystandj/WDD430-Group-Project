"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import CTAButton from "./components/CTAButton";

import ItemSpotlightUI from "./(landingComponents)/ItemSpotlight/page";
import HeroImage from "./ui/HeroImage";

export default function Home() {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;


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

   

       
        <div className="mt-12">
          <ItemSpotlightUI />
          
        </div>
      </main>

      
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
