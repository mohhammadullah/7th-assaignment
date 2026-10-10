
import { Suspense } from "react";
import CategoryProductsClient from "./CategoryProductsClient";

export default function CategoryProductsPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f3f6f3] p-8 text-center">
          পণ্য লোড হচ্ছে...
        </div>
      }
    >
      <CategoryProductsClient params={params} />
    </Suspense>
  );
}