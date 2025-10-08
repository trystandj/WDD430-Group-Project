"use client";

import styles from  "./header.module.css";
import Link from "next/link";
import Image from 'next/image'
import clsx from "clsx";
import { useState } from "react";

interface NavigationProps {
    mobile: boolean;
}

function Navigation({mobile}: NavigationProps) {
    return (
        <div className={styles.linksContainer}>
            <nav className={clsx(mobile ? styles.linksMobile : styles.links)}>
                <Link href="/">Home</Link>
                <Link href="/sellers">Sellers</Link>
                {
                                    mobile && <Link href="/">Login</Link>
                }
            </nav>
        </div>
    )
}

export default function Header() {
    const [visible, setVisible] = useState(false);

    return (
        <header className={styles.container}>
            <div>
                <Link href="/">
                    <span>Handcrafted</span>
                    <h1>Haven</h1>
                </Link>
            </div>
            <Navigation mobile={false}/>
            {
                visible && <Navigation mobile={true} />
            }
            
            <div>
                <Link href="/login">
                    <button className={styles.button}>Login</button>
                </Link>
                <button className={styles.hamButton} onClick={() => setVisible(!visible)}>
                    <Image width={24} height={24} src="/icons/ham-icon.svg" alt="ham-button" />
                </button>
            </div>
        </header>
    );
}