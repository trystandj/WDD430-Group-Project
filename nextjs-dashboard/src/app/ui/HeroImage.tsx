"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";

interface HeroImageProps {
  images: { src: string; alt: string; heading?: string; subheading?: string }[];
  interval?: number;
}

export default function HeroImage({
  images,
  interval = 8000,
}: HeroImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  const current = images[currentIndex];

  return (
    <section className={styles.hero}>
      <div className={styles.heroImageWrapper}>
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay}>
          {current.heading && <h1 className={styles.heroHeading}>{current.heading}</h1>}
          {current.subheading && <p className={styles.heroSubheading}>{current.subheading}</p>}
        </div>
      </div>
    </section>
  );
}