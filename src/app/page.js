import { Suspense } from "react";
import AllProductsGrid from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceMarquee from "@/components/marquee";
import NavLinks from "@/components/NavLinks";
import PriceDecreaseGrid from "@/components/price-low";
import PriceIncreaseGrid from "@/components/price-up";

export default function Home() {
  return (
    <div>
      <Banner />
      
      {/* দাম বাড়ার গ্রিড */}
      <Suspense fallback={<div className="text-center py-10 text-gray-500">লোড হচ্ছে...</div>}>
        <PriceIncreaseGrid />
      </Suspense>

      {/* দাম কমার গ্রিড */}
      <Suspense fallback={<div className="text-center py-10 text-gray-500">লোড হচ্ছে...</div>}>
        <PriceDecreaseGrid />
      </Suspense>

      {/* সব প্রোডাক্টস গ্রিড */}
      <div id="all-products">
        <Suspense fallback={<div className="text-center py-10 text-gray-500">লোড হচ্ছে...</div>}>
          <AllProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}