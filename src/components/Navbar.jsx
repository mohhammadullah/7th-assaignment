
import Image from "next/image";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <nav className="navbar mx-auto min-h-16 w-full max-w-7xl px-3 sm:px-5 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Image
            src="/assetes/logo-icon.png"
            alt="বাজার দর"
            width={40}
            height={40}
            className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10"
          />

          <div className="min-w-0">
            <h1 className="text-sm font-bold text-gray-900 sm:text-base">
              বাজার দর
            </h1>

            <p className="truncate text-[9px] text-gray-500 sm:text-[10px]">
              {date}
            </p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button className="btn btn-ghost btn-xs text-xs text-gray-800 sm:btn-sm sm:text-sm">
            সাইন ইন
          </button>

          <button className="btn btn-xs border-green-700 bg-green-700 text-xs text-white hover:bg-green-800 sm:btn-sm sm:text-sm">
            সাইন আপ
          </button>
        </div>
      </nav>
      <NavLinks></NavLinks>
    </header>
  );
};

export default Navbar;



