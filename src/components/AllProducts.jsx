"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "০";

  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return num.toString().replace(/\d/g, (digit) => bnDigits[digit]);
};

export default function AllProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Response:", data);
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : Array.isArray(data.data)
              ? data.data
              : Array.isArray(data.data?.products)
                ? data.data.products
                : Array.isArray(data.result)
                  ? data.result
                  : [];
        console.log("Products:", items);
        setProducts(items);
      } catch (error) {
        console.error("Products fetch failed:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f3f6f3] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">সকল পণ্য</h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {toBengaliNumber(products.length)} টি পণ্য পাওয়া গেছে
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl bg-white p-4 shadow-sm"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-gray-500">কোনো পণ্য পাওয়া যায়নি!</p>
          </div>
        ) : (
          /* All Products Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map((item) => {
              const isImageUrl = item.image && item.image.startsWith("http");

              const isPriceUp = item.change?.dir === "up";

              return (
                <Link
                  href={`/product/${item.slug}`}
                  key={item.id || item.slug}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5"
                >
                  {/* Product Image and Information */}
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-2xl sm:h-14 sm:w-14">
                      {isImageUrl ? (
                        <Image
                          src={item.image}
                          alt={item.nameBn || item.name || "পণ্য"}
                          width={40}
                          height={40}
                          unoptimized
                          className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
                        />
                      ) : (
                        <span>{item.image || item.categoryIcon || "📦"}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="wrap-break-word text-base font-semibold leading-tight text-gray-900 sm:text-lg">
                        {item.nameBn || item.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        প্রতি {item.unit || "ইউনিট"}
                      </p>

                      <div className="mt-2">
                        <span className="block text-[11px] leading-none text-gray-400 sm:text-xs">
                          আজকের দাম
                        </span>

                        <span className="text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">
                          {toBengaliNumber(item.today)} টাকা
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Change Indicator */}
                  {item.change && item.change.pct !== undefined && (
                    <div className="shrink-0 self-end pb-1 pl-2">
                      <div
                        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium sm:px-2.5 sm:text-sm ${
                          isPriceUp
                            ? "border-red-100 bg-red-50 text-red-600"
                            : item.change.dir === "down"
                              ? "border-green-100 bg-green-50 text-green-600"
                              : "border-gray-100 bg-gray-50 text-gray-500"
                        }`}
                      >
                        <span>
                          {isPriceUp
                            ? "▲"
                            : item.change.dir === "down"
                              ? "▼"
                              : "—"}
                        </span>

                        <span>
                          {toBengaliNumber(
                            Math.abs(Number(item.change.pct || 0)).toFixed(1),
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
        )}
      </div>
    </div>
  );
}
