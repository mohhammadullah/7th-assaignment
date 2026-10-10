
const PriceMarquee = async () => {
  let products = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const result = await res.json();

    products = Array.isArray(result)
      ? result
      : result.products ?? result.data ?? [];
  } catch (error) {
    console.error("Products API error:", error);
    return null;
  }

  if (!products.length) return null;

  return (
    <section className="w-full overflow-hidden border-b border-gray-200 bg-white py-3">
      <div className="marquee-track flex w-max">
        {[...products, ...products].map((product, index) => {
          const isDown = product.change?.dir === "down";
          const isUp = product.change?.dir === "up";

          return (
            <div
              key={`${product.id ?? product.slug}-${index}`}
              className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 text-sm"
            >
              <span>{product.image || product.categoryIcon || "🛒"}</span>

              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>

              <span className="font-bold text-gray-900">
                {product.today}/{product.unit === "kg" ? "কেজি" : product.unit}
              </span>

              {product.change?.pct != null && (
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
                  {product.change.pct}%
                </span>
              )}
            </div>
          );
        })}
      </div>


    </section>
  );
};

export default PriceMarquee;

