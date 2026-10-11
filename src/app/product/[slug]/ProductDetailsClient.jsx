"use client";

import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "০";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[digit]);
};

export default function ProductDetailsClient({ params }) {
  const { slug } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
        if (res.ok) {
          const data = await res.json();
          const allItems = Array.isArray(data) ? data : data.products || [];
          
          const foundItem = allItems.find((item) => item.slug === slug);
          setProduct(foundItem || null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full bg-[#f3f6f3] min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-96 bg-white rounded-2xl animate-pulse p-6"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full bg-[#f3f6f3] min-h-screen py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি!</h1>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-green-600 hover:underline"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isImageUrl = product.image && product.image.startsWith("http");
  const changeDir = product.change?.dir;
  const pctValue = Number(product.change?.pct || 0);

  // API theke asha real market data (markets, marketList ba market theke)
  const rawMarkets = product.markets || product.marketList || product.market || [];
  
  // Market data parse kora ebong gor (avg) calculate kora

const markets = Array.isArray(rawMarkets)
  ? rawMarkets.map((m) => {
      const minVal = Number(m.min ?? m.minPrice ?? 0);
      const maxVal = Number(m.max ?? m.maxPrice ?? 0);

      const avgVal =
        m.avg != null
          ? Number(m.avg)
          : Number(((minVal + maxVal) / 2).toFixed(1));

      return {
        name: m.market || m.name || m.marketName || "বাজার",
        division: m.division || m.region || "",
        min: minVal,
        max: maxVal,
        avg: avgVal,
      };
    })
  : [];



  // Summary er jonno min, max ebong overall average calculate kora
  const minMarketPrice = markets.length > 0 ? Math.min(...markets.map(m => m.min)) : (product.today || 0);
  const maxMarketPrice = markets.length > 0 ? Math.max(...markets.map(m => m.max)) : (product.today || 0);
  
  const totalAvgSum = markets.reduce((acc, curr) => acc + curr.avg, 0);
  const overallAvgPrice = markets.length > 0 ? (totalAvgSum / markets.length).toFixed(1) : (product.today || 0);

  return (
    <div className="w-full bg-[#f3f6f3] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-800">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-gray-800">
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.nameBn || product.name}</span>
        </div>

        {/* Main Header Card with Price Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl shrink-0 overflow-hidden border border-gray-200">
              {isImageUrl ? (
                <Image
                  src={product.image}
                  alt={product.nameBn || product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>{product.image || product.categoryIcon || "📦"}</span>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                {product.nameBn || product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                প্রতি {product.unit || "কেজি"} - {product.categoryNameBn || "পণ্যের বিবরণ"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                গতকালের তুলনায় আজকের দাম <span className="text-gray-900 font-semibold">{changeDir === "down" ? "কমেছে" : "বেড়েছে"}</span>
              </p>
            </div>
          </div>

          {/* Today's Price Box */}
          <div className="bg-white border border-gray-100 rounded-xl px-6 py-3 text-center min-w-[140px] shadow-sm">
            <span className="text-xs text-gray-400 block font-medium">আজকের দাম</span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5 block">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-xs text-gray-500 block">টাকা / {product.unit || "কেজি"}</span>
            <span className={`text-xs font-semibold mt-1 inline-flex items-center gap-1 ${changeDir === "down" ? "text-green-600" : "text-red-600"}`}>
              {changeDir === "down" ? "▼" : "▲"} {toBengaliNumber(pctValue.toFixed(1))}%
            </span>
          </div>
        </div>

        {/* Price Summary Section (দামের সারসংক্ষেপ) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
              <span className="text-lg sm:text-xl font-bold text-green-600 mt-1 block">
                {toBengaliNumber(minMarketPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5 block">সবচেয়ে কম দামের বাজার</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-xs text-gray-500 block">সর্বোচ্চ দাম</span>
              <span className="text-lg sm:text-xl font-bold text-red-600 mt-1 block">
                {toBengaliNumber(maxMarketPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5 block">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-xs text-gray-500 block">গড় দাম</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900 mt-1 block">
                {toBengaliNumber(overallAvgPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5 block">প্রতি {product.unit || "কেজি"}-এর হিসাব</span>
            </div>
          </div>
        </div>

        {/* Bazar-vittik Ajker Dam Table (বাজারভিত্তিক আজকের দাম টেবিল) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs sm:text-sm text-gray-500">
                  <th className="py-3 px-4 font-medium">বাজার</th>
                  <th className="py-3 px-4 font-medium">বিভাগ</th>
                  <th className="py-3 px-4 font-medium">সর্বনিম্ন</th>
                  <th className="py-3 px-4 font-medium">সর্বোচ্চ</th>
                  <th className="py-3 px-4 font-medium">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs sm:text-sm text-gray-700">
                {markets.length > 0 ? (
                  markets.map((m, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                 <td className="py-3.5 px-4 font-medium text-gray-900">{m.name}</td>
                      <td className="py-3.5 px-4 text-gray-500">{m.division}</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(m.min)} টাকা</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(m.max)} টাকা</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">{toBengaliNumber(m.avg)} টাকা</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      এই পণ্যের কোনো বাজারভিত্তিক দাম পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}