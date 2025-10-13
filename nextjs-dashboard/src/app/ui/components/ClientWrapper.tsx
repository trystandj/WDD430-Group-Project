"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Footer from "./Footer";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showCTA = pathname === "/";

  return (
    <>
      <main className="flex-grow pt-[5rem] md:pt-0 m-0">{children}</main>
      
    </>
  );
}
