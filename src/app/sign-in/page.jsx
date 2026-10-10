"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f3] flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      {/* হেডার অংশ */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          সাইন ইন
        </h1>
        <p className="text-gray-600 text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* মূল কার্ড */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ইমেইল ফিল্ড */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 transition"
              required
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 transition"
              required
            />
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#008a3e] hover:bg-[#007534] text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            সাইন ইন
          </button>
        </form>

        {/* ডিভাইডার */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-gray-500 absolute">
            অথবা
          </span>
        </div>

        {/* সোশাল সাইন ইন বাটন */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-lg" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
          >
            <FaGithub className="text-lg text-gray-900" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* সাইন আপ লিংক (এখানে /signup এর পরিবর্তে /sign-up করা হয়েছে) */}
        <div className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-[#008a3e] font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* হোম পেজে ফিরে যাওয়ার লিংক */}
      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;