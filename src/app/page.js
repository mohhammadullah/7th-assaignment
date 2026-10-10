import AllProductsGrid from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceMarquee from "@/components/marquee";
import NavLinks from "@/components/NavLinks";
import PriceDecreaseGrid from "@/components/price-low";
import PriceIncreaseGrid from "@/components/price-up";

export default function Home() {
  return (
    <div >
     
       
        <Banner></Banner>
       <PriceIncreaseGrid></PriceIncreaseGrid>
      <PriceDecreaseGrid></PriceDecreaseGrid>
     <div id="all-products">  <AllProductsGrid></AllProductsGrid></div>
    </div>
  );
}
