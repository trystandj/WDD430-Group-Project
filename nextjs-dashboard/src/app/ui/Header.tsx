"use client";

import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface NavigationProps {
  mobile: boolean;
  isLoggedIn: boolean;
}

function Navigation({ mobile, isLoggedIn }: NavigationProps) {
  return (
    <div className={styles.linksContainer}>
      <nav className={clsx(mobile ? styles.linksMobile : styles.links)}>
        <Link href="/">Home</Link>
        <Link href="/sellers">Sellers</Link>
        <Link href="/catalog">Catalog</Link>
        {mobile && (
          <Link href={isLoggedIn ? "/user-dashboard" : "/login"}>
            {isLoggedIn ? "Profile" : "Login"}
          </Link>
        )}
      </nav>
    </div>
  );
}

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  useEffect(() => {
  const handleStorageChange = () => {
    setLoggedIn(!!localStorage.getItem("token"));
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  return (
    <header className={clsx(styles.container, "z-50")}>
      <div>
        <Link href="/">
          <span>Handcrafted</span>
          <h1>Haven</h1>
        </Link>
      </div>

      <Navigation mobile={false} isLoggedIn={isLoggedIn} />

      {visible && <Navigation mobile={true} isLoggedIn={isLoggedIn} />}

      <div>
        <Link href={isLoggedIn ? "/user-dashboard" : "/login"}>
          <button className={styles.button}>
            {isLoggedIn ? "Profile" : "Login"}
          </button>
        </Link>

        <button
          className={styles.hamButton}
          onClick={() => setVisible(!visible)}
        >
          <Image
            width={24}
            height={24}
            src="/icons/ham-icon.svg"
            alt="ham-button"
          />
        </button>
      </div>
    </header>
  );
}
