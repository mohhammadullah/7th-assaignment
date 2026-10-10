"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password) {
      toast.error("সবগুলো তথ্য পূরণ করুন।");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password: formData.password,
      });

      if (error) {
        toast.update(toastId, {
          render:
            error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
        return;
      }

      if (!data) {
        toast.update(toastId, {
          render: "সার্ভার থেকে সঠিক উত্তর পাওয়া যায়নি।",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      toast.update(toastId, {
        render: "অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error);

      toast.update(toastId, {
        render: "সমস্যা হয়েছে। ইন্টারনেট বা সার্ভার পরীক্ষা করুন।",
        type: "error",
        isLoading: false,
        autoClose: 3500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleSocialSignup = async (provider) => {
    try {
      toast.loading(`${provider} দিয়ে সংযোগ করা হচ্ছে...`, { toastId: "social" });
      await authClient.signIn.social({
        provider: provider.toLowerCase(),
        callbackURL: "/",
      });
    } catch (error) {
      toast.dismiss("social");
      toast.error(`${provider} দিয়ে সাইন আপ করতে সমস্যা হয়েছে।`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3f5f3] p-4 font-sans text-gray-800">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে বাজারের বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-semibold"
            >
              আপনার নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none focus:border-green-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none focus:border-green-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              className="w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none focus:border-green-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-semibold"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="আবার পাসওয়ার্ড লিখুন"
              minLength={8}
              className="w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none focus:border-green-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#008a3e] py-3 font-semibold text-white transition hover:bg-[#007534] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-200" />
          <span className="absolute bg-white px-3 text-xs text-gray-500">
            অথবা
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignup("Google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-xs font-semibold hover:bg-gray-50"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignup("GitHub")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-xs font-semibold hover:bg-gray-50"
          >
            <FaGithub className="text-lg" />
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#008a3e] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 text-sm text-gray-500 hover:text-gray-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}