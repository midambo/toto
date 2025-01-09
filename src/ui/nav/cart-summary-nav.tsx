import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { formatMoney } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/tooltip";
import * as Commerce from "@/lib/commerce";
import { ShoppingBagIcon } from "lucide-react";
import { Suspense } from "react";
import { CartLink } from "./cart-link";

export async function CartSummaryNav() {
  const cart = await getCartFromCookiesAction();
  const total = cart ? Commerce.calculateCartTotalNetWithoutShipping(cart) : 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CartLink>
            <div className="relative">
              <ShoppingBagIcon className="h-6 w-6" />
              <Suspense>
                <CartBadge total={total} />
              </Suspense>
            </div>
          </CartLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function CartBadge({ total }: { total: number }) {
  return (
    <div className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-none text-primary-foreground">
      {formatMoney({ amount: total, currency: "USD" })}
    </div>
  );
}
