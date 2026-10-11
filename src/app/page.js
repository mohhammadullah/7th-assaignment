
import { Suspense } from "react";

import AllProductsGrid from "@/components/AllProducts";
import Banner from "@/components/Banner";

import PriceDecreaseGrid from "@/components/price-low";
import PriceIncreaseGrid from "@/components/price-up";


export default function Home() {
  return (
    <main>


      <Banner />

      <Suspense fallback={<p>দাম বাড়ছে এমন পণ্য লোড হচ্ছে...</p>}>
        <PriceIncreaseGrid />
      </Suspense>

      <Suspense fallback={<p>দাম কমছে এমন পণ্য লোড হচ্ছে...</p>}>
        <PriceDecreaseGrid />
      </Suspense>

      <section id="all-products">
        <Suspense fallback={<p>সব পণ্য লোড হচ্ছে...</p>}>
          <AllProductsGrid />
        </Suspense>
      </section>
    </main>
  );
}