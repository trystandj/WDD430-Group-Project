"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import CTAButton from "./ui/components/CTAButton";
import BusinessSpotlight from "./(landingComponents)/BusinessSpotlight/page";

export default function Home() {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
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
            <CTAButton text="Login" />
          </Link>
        )}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
