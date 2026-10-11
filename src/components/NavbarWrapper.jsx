
import { Suspense } from "react";
import NavLinks from "@/components/NavLinks";
import PriceMarquee from "@/components/marquee";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="h-12 bg-white" />
        }
      >
        <NavLinks />
      </Suspense>

      <Suspense
        fallback={<div className="h-8 bg-white" />}
      >
        <PriceMarquee />
      </Suspense>
    </>
  );
}

