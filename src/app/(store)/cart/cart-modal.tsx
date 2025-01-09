import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { getLocale, getTranslations } from "@/i18n/server";
import { formatMoney, formatProductName } from "@/lib/utils";
import { Button } from "@/ui/shadcn/button";
import { YnsLink } from "@/ui/yns-link";
import { calculateCartTotalNetWithoutShipping } from "@/lib/cart-utils";
import Image from "next/image";
import { CartAsideContainer } from "./cart-aside";
import { Suspense } from "react";

async function CartItems() {
  const originalCart = await getCartFromCookiesAction();
  const cart = originalCart;

  if (!cart || cart.lines.length === 0) {
    return <div className="text-center py-4">Your cart is empty</div>;
  }

  const currency = cart.lines[0]!.product.default_price.currency;
  const total = calculateCartTotalNetWithoutShipping(cart);
  const t = await getTranslations("/cart.modal");
  const locale = await getLocale();

  return (
    <div className="space-y-4">
      {cart.lines.map((line) => (
        <div key={line.product.id} className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-medium">{formatProductName(line.product.name, line.product.metadata.variant)}</h3>
            <p className="text-sm text-muted-foreground">
              {t("quantity", { quantity: line.quantity })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {formatMoney({
                amount: line.product.default_price.unit_amount ?? 0,
                currency: line.product.default_price.currency,
                locale,
              })}
            </p>
          </div>
        </div>
      ))}
      <div
        id="cart-overlay-description"
        className="flex justify-between text-base font-medium text-neutral-900"
      >
        <p>{t("total")}</p>
        <p>
          {formatMoney({
            amount: total,
            currency,
            locale,
          })}
        </p>
      </div>
      <p className="mt-0.5 text-sm text-neutral-500">{t("shippingAndTaxesInfo")}</p>
      <Button asChild={true} size={"lg"} className="mt-6 w-full rounded-full text-lg">
        <YnsLink href="/cart">{t("goToPaymentButton")}</YnsLink>
      </Button>
    </div>
  );
}

export function CartModalPage() {
  return (
    <CartAsideContainer>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-700">Shopping Cart</h2>
          <YnsLink replace href="/cart" className="text-sm text-muted-foreground underline">
            Open full view
          </YnsLink>
        </div>

        <div className="mt-8">
          <Suspense 
            fallback={<div className="text-center py-4">Loading cart...</div>}
          >
            <CartItems />
          </Suspense>
        </div>
      </div>
    </CartAsideContainer>
  );
}
