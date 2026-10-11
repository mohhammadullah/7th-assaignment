
import { Suspense } from "react";
import CategoryProductsClient from "./CategoryProductsClient";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f3f6f3] p-8 text-center">
      পণ্য লোড হচ্ছে...
    </div>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;

  return <CategoryProductsClient params={{ slug }} />;
}

export default function CategoryProductsPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

