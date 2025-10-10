"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import CTAButton from "./components/CTAButton";
import BusinessSpotlight from "./(landingComponents)/BusinessSpotlight/page";

export default function Home() {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {<div className="hero-content flex flex-col items-center justify-center text-center gap-4">
         <h1 className="text-4xl font-bold">Welcome to Our Marketplace!</h1>
         <p className="text-lg text-gray-600">Find amazing sellers or start selling today.</p>
         <CTAButton text="Get Started" onClick={() => window.location.href = '/signup'} />
         </div>}
        
        <BusinessSpotlight />
        

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <h1>Welcome, {user}! 🎉</h1>
            <CTAButton text="Do Something Cool" />
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
           
          </Link>
          
          
          
          
        )}
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
