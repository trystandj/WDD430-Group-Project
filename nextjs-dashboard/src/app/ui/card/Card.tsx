"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/card/card.module.css";

type ImageData = {
    src: string;
    link: string;
};

type SpotlightCardProps = {
    name: string;
    description?: string;
    images: ImageData[];
};

export default function Card({ name, description, images, children }: 
    SpotlightCardProps & { children?: React.ReactNode }
) {
    
    const displayImages = [...images.slice(0, 6)];
    while (displayImages.length < 6) {
        displayImages.push({ src: "", link: "" });
    }

    return (
        <Link href={displayImages[0]?.link || "#"} className={styles.cardLink}>
        <div className={styles.card}>
            
            {displayImages[0]?.src && (
            // Using external image source (Picsum/placeholder images)
            <img
                src={displayImages[0].src}
                width={300}
                height={300}
                alt={name}
                style={{
                objectFit: "cover",
                borderRadius: "8px",
                transition: "transform 0.2s ease",
                }}
                className={styles.cardImage}
            />
            
        
            // Use this when switching back to local images in /public folder
            /* 
            <Image
                src={displayImages[0].src}
                width={300}
                height={300}
                alt={name}
                style={{
                objectFit: "cover",
                borderRadius: "8px",
                transition: "transform 0.2s ease",
                }}
                className={styles.cardImage}
            />
            */
            )}

            {/* Content */}
                <div className={styles.card__content}>
                <h3 className={styles.card__title}>{name}</h3>
                <p className={styles.card__description}>{description}</p>
                { children }
            </div>
        </div>
        </Link>
    );
}