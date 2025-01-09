import { publicUrl } from "@/env.mjs";
import { getTranslations } from "@/i18n/server";
import { getFeaturedProducts, getNewProducts } from "@/lib/db";
import { ProductList } from "@/ui/products/product-list";
import { Separator } from "@/ui/shadcn/separator";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Toto Kids Store - Quality Kids Products in Kenya",
  description: "Shop for high-quality kids' products including skates, bicycles, tricycles, scooters, and toys. Fast delivery in Kenya.",
  openGraph: {
    title: "Toto Kids Store - Quality Kids Products in Kenya",
    description: "Shop for high-quality kids' products including skates, bicycles, tricycles, scooters, and toys. Fast delivery in Kenya.",
    url: publicUrl,
  },
};

export default async function HomePage() {
  console.log('Starting to fetch data...');
  
  try {
    const [t, featuredProducts, newProducts] = await Promise.all([
      getTranslations(),
      getFeaturedProducts(4),
      getNewProducts(4),
    ]);

    console.log('Data fetched successfully:', {
      featuredProductsCount: featuredProducts.length,
      newProductsCount: newProducts.length
    });

    return (
      <div className="container space-y-12 py-8">
        <section>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">
              Our most popular kids' products
            </p>
          </div>
          <Separator className="my-4" />
          <ProductList products={featuredProducts} />
        </section>

        <section>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-muted-foreground">
              Check out our latest kids' products
            </p>
          </div>
          <Separator className="my-4" />
          <ProductList products={newProducts} />
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    throw error;
  }
}
