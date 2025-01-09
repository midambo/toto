import { publicUrl } from "@/env.mjs";
import { getTranslations } from "@/i18n/server";
import { getCategoryBySlug, getProducts } from "@/lib/db";
import { ProductList } from "@/ui/products/product-list";
import { Separator } from "@/ui/shadcn/separator";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description || undefined,
    openGraph: {
      title: category.name,
      description: category.description || undefined,
      url: `${publicUrl}/category/${category.slug}`,
      images: category.image ? [{ url: category.image }] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [t, category] = await Promise.all([
    getTranslations(),
    getCategoryBySlug(params.slug),
  ]);

  if (!category) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="text-muted-foreground">
          The category you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const products = await getProducts(category.id);

  return (
    <div className="container py-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
      </div>
      <Separator className="my-4" />
      <ProductList products={products} />
    </div>
  );
}
