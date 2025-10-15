"use client";

import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface NavigationProps {
  mobile: boolean;
  dashboardPath: string;
  isLoggedIn: boolean;
}

function Navigation({ mobile, dashboardPath, isLoggedIn }: NavigationProps) {
  return (
    <div className={styles.linksContainer}>
      <nav className={clsx(mobile ? styles.linksMobile : styles.links)}>
        <Link href="/">Home</Link>
        <Link href="/sellers">Sellers</Link>
        <Link href="/catalog">Catalog</Link>
        {mobile && <Link href={dashboardPath}>{isLoggedIn ? "Profile" : "Login"}</Link>}
      </nav>
    </div>
  );
}

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateDashboardPath = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setDashboardPath("/login");
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    const role = localStorage.getItem("userRole");
    if (role === "seller") setDashboardPath("/user-dashboard/seller");
    else if (role === "user") setDashboardPath("/user-dashboard/user");
    else setDashboardPath("/login");
  };

  useEffect(() => {
    updateDashboardPath();

    window.addEventListener("storage", updateDashboardPath);
    return () => window.removeEventListener("storage", updateDashboardPath);
  }, []);

  return (
    <header className={clsx(styles.container, "z-50")}>
      <div>
        <Link href="/">
          <Image 
            src="/logo.png"
            alt="Hero image"
            width={142.5}
            height={45} 
            fetchPriority="high"
            className={`${styles.logo} hidden md:block`}
          />
        </Link>
      </div>

      <Navigation mobile={false} dashboardPath={dashboardPath} isLoggedIn={isLoggedIn} />

      {visible && <Navigation mobile={true} dashboardPath={dashboardPath} isLoggedIn={isLoggedIn} />}

      <div>
        <Link href={dashboardPath}>
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