"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center gap-2.5">
      {user ? (
        <div className="relative">
         
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100"
          >
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User"}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />

            <span className="max-w-28 truncate text-sm font-medium text-gray-800">
              {user.name}
            </span>

            <span className="text-xs">▼</span>
          </button>

  
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg">
              <div className="border-b pb-2">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <div className="mt-2 flex flex-col gap-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                >
                  👤 আমার প্রোফাইল
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  ↵ সাইন আউট
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="btn btn-ghost btn-xs text-xs text-gray-800 sm:btn-sm sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn btn-xs border-green-700 bg-green-700 text-xs text-white hover:bg-green-800 sm:btn-sm sm:text-sm"
          >
            সাইন আপ
          </Link>
        </>
      )}
    </div>
  );
};

export default UserInfo;