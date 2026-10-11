
import Image from "next/image";
import Link from "next/link";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "০";

  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return String(num).replace(/\d/g, (digit) => bnDigits[digit]);
};

async function getProducts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.error("Products API status:", res.status);
      return [];
    }

    const result = await res.json();

    const products = Array.isArray(result)
      ? result
      : Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.data?.products)
          ? result.data.products
          : Array.isArray(result.products)
            ? result.products
            : [];

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function PriceIncreaseGrid() {
  const products = await getProducts();

  const priceIncreasedProducts = products
    .filter((item) => item?.change?.dir === "up")
    .slice(0, 6);

  return (
    <section className="w-full bg-[#f3f6f3] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-sm text-red-500">▲</span>
          <h2 className="text-xl font-bold text-gray-800">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {priceIncreasedProducts.length === 0 ? (
          <p className="text-sm text-gray-500">
            এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {priceIncreasedProducts.map((item, index) => {
              const image = item.image;
              const isImageUrl =
                typeof image === "string" &&
                /^https?:\/\//.test(image);

              const name = item.nameBn || item.name || "পণ্য";
              const price = item.today ?? item.price;

              return (
                <Link
                  href={`/product/${item.slug ?? item.id}`}
                  key={item.id ?? item.slug ?? `${name}-${index}`}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-green-200 hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-2xl sm:h-14 sm:w-14">
                      {isImageUrl ? (
                        <Image
                          src={image}
                          alt={name}
                          width={48}
                          height={48}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span>{image || item.categoryIcon || "📦"}</span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-semibold leading-tight text-gray-900 sm:text-lg">
                        {name}
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        প্রতি {item.unit || "ইউনিট"}
                      </p>

                      <div className="mt-2">
                        <span className="block text-[11px] leading-none text-gray-400 sm:text-xs">
                          আজকের দাম
                        </span>

                        <span className="text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">
                          {price != null
                            ? `${toBengaliNumber(price)} টাকা`
                            : "দাম পাওয়া যায়নি"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-end pb-1">
                    <div className="flex items-center gap-1 rounded-md border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 sm:text-sm">
                      <span>▲</span>
                      <span>
                        {toBengaliNumber(
                          Number(item.change?.pct ?? 0).toFixed(1)
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}