import Link from "next/link";

export default function NotFound() {
return ( <main className="flex min-h-[80vh] flex-col items-center justify-center bg-[#f8fcfa] px-4 py-12 text-center"> <div className="mb-6 text-8xl font-extrabold tracking-tight text-green-600 sm:text-9xl">
404 </div>

  <div className="mb-4 text-5xl">🛒</div>

  <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-4xl">
    উফ! পেজটি খুঁজে পাওয়া যাচ্ছে না
  </h1>

  <p className="mb-8 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
    আপনি যে লিংকে এসেছেন, সেটি হয়তো ভুল, মেয়াদোত্তীর্ণ
    অথবা সরিয়ে ফেলা হয়েছে।
  </p>

  <Link
    href="/"
    className="inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
  >
    <span aria-hidden="true">⌂</span>
    হোম পেজে ফিরে যান
  </Link>
</main>


);
}
