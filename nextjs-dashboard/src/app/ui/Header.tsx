"use client";

import styles from  "./header.module.css";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface NavigationProps {
    mobile: boolean;
}

function Navigation({mobile}: NavigationProps) {
    return (
        <div className={styles.linksContainer}>
            <nav className={clsx(mobile ? styles.linksMobile : styles.links)}>
                <Link href="/">page 1</Link>
                <Link href="/">page 2</Link>
                <Link href="/">page 3</Link>
                <Link href="/">page 4</Link>
            </nav>
        </div>
    )
}

export default function Header() {
    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        console.log(visible);
    }, [visible])

    return (
        <header className={styles.container}>
            <div>
                <Link href="/">
                    <h1>Logo</h1>
                </Link>
            </div>
            <Navigation mobile={false}/>
            {
                visible && <Navigation mobile={true} />
            }
            
            <div>
                <Link href="/">
                    <button className={styles.button}>Learn More</button>
                </Link>
                <button className={styles.hamButton} onClick={() => setVisible(!visible)}>
                    <img width={100} height={100} src="/icons/ham-icon.svg" alt="ham-button"/>
                </button>
            </div>
        </header>
    );
}