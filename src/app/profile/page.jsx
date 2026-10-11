"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

 const handleLogout = async () => {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("লগআউট করতে সমস্যা হয়েছে!");
      return;
    }

    toast.success("সফলভাবে লগআউট হয়েছে!");

    setTimeout(() => {
      router.push("/sign-in");
    }, 1000);
  } catch (err) {
    toast.error("লগআউট করতে সমস্যা হয়েছে!");
  }
};

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedName = name.trim() || user?.name;

    if (!updatedName) {
      toast.error("অনুগ্রহ করে একটি নাম লিখুন।");
      return;
    }

    setIsUpdating(true);
    const toastId = toast.loading("আপডেট হচ্ছে...");

    try {
      const { data, error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.update(toastId, {
          render: "আপডেট করতে সমস্যা হয়েছে: " + (error.message || "Unknown error"),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "নাম সফলভাবে আপডেট করা হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
        setName(""); 
        await refetch();
        router.refresh();
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.update(toastId, {
        render: "কোথাও কোনো ত্রুটি ঘটেছে।",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-600">আপনি লগইন করেননি।</p>
        <button
          onClick={() => router.push("/sign-in")}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          সাইন ইন করুন
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6f3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Info Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-2xl font-bold text-gray-700">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <span>↵</span> সাইন আউট
          </button>
        </div>

        {/* Update Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="mb-6 text-lg font-bold text-gray-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                নাম
              </label>
              <input
                type="text"
                value={name}
                placeholder={user.name || "আপনার নাম লিখুন"}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-600 focus:bg-white focus:ring-1 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-xl bg-[#048848] py-3 text-sm font-medium text-white shadow-sm hover:bg-[#036e3a] transition disabled:opacity-50"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}