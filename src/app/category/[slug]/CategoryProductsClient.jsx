"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";


const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "০";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[digit]);
};

export default function CategoryProductsPage({ params }) {

  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
        if (res.ok) {
          const data = await res.json();
          const allItems = Array.isArray(data) ? data : data.products || [];
          
    
          const categoryItems = allItems.filter(
            (item) => item.category === slug
          );
          setProducts(categoryItems);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProducts();
    }
  }, [slug]);


  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low-high") return (a.today || 0) - (b.today || 0);
    if (sortBy === "price-high-low") return (b.today || 0) - (a.today || 0);
    if (sortBy === "pct-high") return (b.change?.pct || 0) - (a.change?.pct || 0);
    if (sortBy === "pct-low") return (a.change?.pct || 0) - (b.change?.pct || 0);
    return 0;
  });

  const categoryName = products[0]?.categoryNameBn || slug;
  const categoryIcon = products[0]?.categoryIcon || "📦";

  return (
    <div className="w-full bg-[#f3f6f3] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-3xl shrink-0">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{categoryName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {toBengaliNumber(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>


        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-600">
              সাজান
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-gray-800 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low-high">দাম: কম থেকে বেশি</option>
              <option value="price-high-low">দাম: বেশি থেকে কম</option>
              <option value="pct-high">দাম বৃদ্ধি (%)</option>
              <option value="pct-low">দাম হ্রাস (%)</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600 font-medium px-1">
          মোট {toBengaliNumber(sortedProducts.length)} টি পণ্য দেখানো হচ্ছে
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-2xl animate-pulse p-4" />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {sortedProducts.map((item) => {
              const isImageUrl = item.image && item.image.startsWith("http");
              const changeDir = item.change?.dir;
              const pctValue = Number(item.change?.pct || 0);

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

                  <div className="self-end pb-1">
                    {changeDir === "up" && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-red-50 text-red-600 border border-red-100">
                        <span>▲</span>
                        <span>{toBengaliNumber(pctValue.toFixed(1))}%</span>
                      </div>
                    )}

                    {changeDir === "down" && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-green-50 text-green-600 border border-green-100">
                        <span>▼</span>
                        <span>{toBengaliNumber(Math.abs(pctValue).toFixed(1))}%</span>
                      </div>
                    )}

                    {(!changeDir || changeDir === "neutral" || pctValue === 0) && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <span>—</span>
                        <span>০.০%</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}