import { getLocale } from "@/i18n/server";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/ui/primitives/card";
import { CartItems } from "@/ui/checkout/cart-items.client";
import { ShippingRatesSection } from "@/ui/checkout/shipping-rates-section";
import { cn } from "@/lib/utils";

export const CheckoutCard = ({
	className,
}: {
	className?: string;
}) => {
	const t = useTranslations("/cart.page");

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<h1 className="text-2xl font-bold">{t("title")}</h1>
			</CardHeader>
			<CardContent className="space-y-8">
				<CartItems />
				<ShippingRatesSection />
			</CardContent>
		</Card>
	);
};
