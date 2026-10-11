export default function Loading() {
return ( <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f8fcfa] px-4">
{/* Animated Loader */} <div className="relative mb-8 flex h-24 w-24 items-center justify-center"> <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />

    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-3xl shadow-lg shadow-green-200">
      🛒
    </div>
  </div>

  {/* Brand */}
  <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
    বাজার <span className="text-green-600">দর</span>
  </h1>

  <p className="mb-8 text-center text-sm text-gray-500 sm:text-base">
    বাজারের সর্বশেষ দাম সংগ্রহ করা হচ্ছে...
  </p>

  {/* Loading Bar */}
  <div className="h-1.5 w-48 overflow-hidden rounded-full bg-green-100">
    <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600" />
  </div>

  <p className="mt-4 text-xs font-medium tracking-wide text-gray-400">
    PLEASE WAIT
  </p>
</main>


);
}
