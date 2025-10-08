"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Footer from "../components/Footer";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showCTA = pathname === "/";

  return (
    <>
      <main className="flex-grow">{children}</main>
      <Footer showCTA={showCTA} />
    </>
  );
}
