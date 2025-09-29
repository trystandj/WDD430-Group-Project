"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import CTAButton from "../components/CTAButton";

export default function Home() {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

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
    </div>
  );
}
