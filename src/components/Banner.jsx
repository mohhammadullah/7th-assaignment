"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

const Banner = () => {
const [date, setDate] = useState("");

useEffect(() => {
const timer = setTimeout(() => {
setDate(
new Date().toLocaleDateString("bn-BD", {
dateStyle: "full",
timeZone: "Asia/Dhaka",
})
);
}, 0);

return () => clearTimeout(timer);


}, []);

return ( <div className="w-full px-4 sm:px-6 lg:px-8 my-6"> <div className="max-w-6xl mx-auto bg-[#f8faf7] border border-[#eef2ec] rounded-2xl p-6 sm:p-10 shadow-sm"> <div className="flex flex-col lg:flex-row items-center justify-between gap-8">


      {/* Left Content Area */}
      <div className="flex-1 space-y-4 text-left">

        {/* Date Badge */}
        <div className="inline-block bg-[#eaf4ec] px-3 py-1 rounded-full">
          <p className="text-xs sm:text-sm font-medium text-[#2d6a4f]">
            {date}
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        {/* Action Button */}
        <div className="pt-2">
<a
  href="#all-products"
  className="inline-block bg-[#1b8542] hover:bg-[#156d35] text-white text-sm sm:text-base font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
>
  সব পণ্য দেখুন
</a>
        </div>

      </div>

      {/* Right Image Area */}
      <div className="shrink-0 flex justify-center items-center">
        <Image
          src="/assetes/bazar-hero.png"
          alt="বাজারের ব্যানার"
          width={280}
          height={220}
          className="object-contain w-auto h-auto max-h-55"
          priority
        />
      </div>

    </div>
  </div>
</div>


);
};

export default Banner;
