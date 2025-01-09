import Image from "next/image";
import { YnsLink } from "@/ui/yns-link";
import type * as Commerce from "@/lib/commerce";
import { formatMoney } from "@/lib/utils";
import { AddToCartButton } from "@/ui/add-to-cart-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/shadcn/card";
import { Badge } from "@/ui/shadcn/badge";

export function ProductList({ products }: { products: Commerce.Product[] }) {
  console.log('Rendering ProductList with products:', products?.length);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  try {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, idx) => (
          <YnsLink key={product.id} href={`/product/${product.id}`} className="group">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              {product.image && (
                <div className="aspect-square w-full overflow-hidden">
                  <Image
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    src={product.image}
                    width={768}
                    height={768}
                    loading={idx < 3 ? "eager" : "lazy"}
                    priority={idx < 3}
                    sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
                    alt={product.name}
                  />
                </div>
              )}
              <CardHeader>
                <h2 className="line-clamp-1 text-xl font-semibold">{product.name}</h2>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {formatMoney(product.price, product.currency)}
                  </span>
                  {product.discount_percentage > 0 && (
                    <Badge variant="destructive">
                      {product.discount_percentage}% OFF
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                {product.is_new && (
                  <Badge variant="secondary">New</Badge>
                )}
                {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                  <Badge variant="outline">Low Stock</Badge>
                )}
                {product.stock_quantity === 0 && (
                  <Badge variant="outline" className="text-destructive">Out of Stock</Badge>
                )}
              </CardFooter>
            </Card>
          </YnsLink>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error in ProductList:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error displaying products</p>
      </div>
    );
  }
};
