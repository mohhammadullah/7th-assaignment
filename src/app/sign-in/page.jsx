"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
        },
  
        {
          onRequest: () => {
            toast.loading("লগইন হচ্ছে...", { id: "login" });
          },
          onSuccess: () => {
            toast.dismiss("login");
            toast.success("সফলভাবে লগইন হয়েছে!");
            router.push("/"); 
            router.refresh();
          },
          onError: (ctx) => {
            toast.dismiss("login");
            toast.error(ctx.error.message || "লগইন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
          },
        }
      );
    } catch (err) {
      toast.dismiss("login");
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
          console.log(data);
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      toast.error("Google দিয়ে লগইন করতে সমস্যা হয়েছে।");
    }
  };


  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("GitHub দিয়ে লগইন করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f5f3] flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          সাইন ইন
        </h1>
        <p className="text-gray-600 text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#008a3e] hover:bg-[#007534] text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-gray-500 absolute">
            অথবা
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition cursor-pointer"
          >
            <FcGoogle className="text-lg" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition cursor-pointer"
          >
            <FaGithub className="text-lg text-gray-900" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

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