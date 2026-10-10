import Image from "next/image";
import React from "react";
import Link from "next/link";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "০";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[digit]);
};


async function getProducts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function PriceDecreaseGrid() {
  const products = await getProducts();

const priceDecreasedProducts = [...products] .filter((item) => item?.change?.dir === "down") .sort( (a, b) => Math.abs(Number(b.change?.pct || 0)) - Math.abs(Number(a.change?.pct || 0)) ) .slice(0, 6);
  return (

    <div className="w-full bg-[#f3f6f3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
   
        <div className="flex items-center gap-2 mb-5">
          <span className="text-green-600 text-sm">▼</span>
          <h2 className="text-xl font-bold text-gray-800">আজ দাম কমেছে</h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {priceDecreasedProducts.map((item) => {
            const isImageUrl = item.image && item.image.startsWith("http");

            return (
              <Link
  href={`/product/${item.slug}`}
  key={item.id || item.slug}
  className="flex items-center justify-between bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:border-green-200 cursor-pointer"
>
          
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    {isImageUrl ? (
                      <Image
                        src={item.image}
                        alt={item.nameBn || item.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full"
                      />
                    ) : (
                      <span>{item.image || item.categoryIcon || "📦"}</span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight">
                      {item.nameBn || item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      প্রতি {item.unit || "ইউনিট"}
                    </p>
                    <div className="mt-2">
                      <span className="text-[11px] sm:text-xs text-gray-400 block leading-none">
                        আজকের দাম
                      </span>
                      <span className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">
                        {toBengaliNumber(item.today)} টাকা
                      </span>
                    </div>
                  </div>
                </div>

              
                {item.change && (
                  <div className="self-end pb-1">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-green-50 text-green-600 border border-green-100">
                      <span>▼</span>
                      <span>
                        {toBengaliNumber(
                          Math.abs(Number(item.change.pct || 0)).toFixed(1)
                        )}
                        %
                      </span>
                    </div>
                  </div>
                )}
            </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}