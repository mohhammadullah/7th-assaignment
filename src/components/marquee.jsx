
async function getProducts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await res.json();

    // API response থেকে products বের করা
    const products = Array.isArray(result)
      ? result
      : result.products ??
        result.data?.products ??
        result.data ??
        [];

    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("BazarDor API Error:", error);
    return [];
  }
}

export default async function PriceMarquee() {
  const products = await getProducts();

  if (!products.length) return null;

  return (
    <section className="w-full overflow-hidden border-b border-gray-200 bg-white py-3">
      <div className="marquee-track flex w-max">
        {[...products, ...products].map((product, index) => {
          const name =
            product.nameBn ??
            product.name ??
            product.title ??
            "পণ্য";

          const price =
            product.today ??
            product.price ??
            product.currentPrice ??
            product.pricePerKg;

          const unit =
            product.unit === "kg"
              ? "কেজি"
              : product.unit;

          const change = product.change;
          const isDown = change?.dir === "down";
          const isUp = change?.dir === "up";

          return (
            <div
              key={`${product.id ?? product.slug ?? name}-${index}`}
              className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 text-sm"
            >
              <span>
                {product.image || product.categoryIcon || "🛒"}
              </span>

              <span className="font-medium text-gray-800">
                {name}
              </span>

              <span className="font-bold text-gray-900">
                {price != null
                  ? `৳${price}${unit ? `/${unit}` : ""}`
                  : "দাম পাওয়া যায়নি"}
              </span>

              {change?.pct != null && (
                <span
                  className={`font-semibold ${
                    isDown
                      ? "text-red-600"
                      : isUp
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {isDown ? "▼" : isUp ? "▲" : "—"}{" "}
                  {change.pct}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}