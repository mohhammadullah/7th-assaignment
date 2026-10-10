import { Suspense } from "react";
import ProductDetailsClient from "./ProductDetailsClient";

export default function ProductDetailsPage({ params }) {
return (
<Suspense fallback={<div>পণ্য লোড হচ্ছে...</div>}>
<ProductDetailsClient params={params} />
</Suspense>
);
}