
import Link from "next/link";

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              className="flex shrink-0 items-center gap-2  bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-green-600 hover:bg-green-50 hover:text-green-700"
            >
              {item.icon && (
                <span className="text-base">
                  {item.icon}
                </span>
              )}

              <span>{item.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;



