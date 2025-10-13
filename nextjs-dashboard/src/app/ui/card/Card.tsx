"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/card/card.module.css";
import clsx from "clsx";

type ImageData = {
    src: string;
    link: string;
};

type SpotlightCardProps = {
    name: string;
    description?: string;
    price?: number;
    images: ImageData[];
    tags?: string[];
};

export default function Card({ name, description, images, children, tags, price }: 
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
            <>
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
                <div className={clsx(styles.item__tags, "absolute bottom-3 left-3")}>
                {
                    tags?.map((tag, i) =>
                        <span key={i} className={styles.item__tag}>
                            #{tag}
                        </span>
                    )
                }
                </div>
                {
                    price && 
                    <div className={clsx(styles.item__price, "absolute right-3 top-3")}>
                        ${price}
                    </div>
                }
            </>
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