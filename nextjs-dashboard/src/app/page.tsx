import Image from "next/image";
import styles from "./page.module.css";
import BusinessSpotlight from "./landingComponents/BusinessSpotlight/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

       

        <BusinessSpotlight />



      </main>
    </div>
  );
}
