import Image from "next/image";
import styles from "./page.module.css";
import BusinessSpotlight from "./landingComponents/BusinessSpotlight/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

       

        <BusinessSpotlight />

      <div className={styles.container} />
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

      </main>
    </div>
  );
}
