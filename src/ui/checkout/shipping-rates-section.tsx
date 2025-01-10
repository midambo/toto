import { cn } from "@/lib/utils";
import * as Commerce from "@/lib/commerce";
import { Card, CardContent, CardHeader } from "@/ui/primitives/card";
import { formatMoney } from "@/lib/utils";

export function ShippingRatesSection({
	shippingRates,
	value,
	onChange,
	locale,
}: {
	shippingRates: Commerce.MappedShippingRate[];
	value: string | null | undefined;
	onChange: (value: string) => void;
	locale: string;
}) {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold">Shipping Options</h2>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{shippingRates.map((rate) => (
						<div key={rate.id}>
							<p className="text-sm font-medium">{rate.display_name}</p>
							{rate.delivery_estimate && (
								<p className="text-xs text-muted-foreground">
									<FormatDeliveryEstimate estimate={rate.delivery_estimate} />
								</p>
							)}
							{rate.fixed_amount && (
								<p className="mt-0.5">
									{formatMoney({
										amount: rate.fixed_amount.amount,
										currency: rate.fixed_amount.currency,
										locale,
									})}
								</p>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export function FormatDeliveryEstimate({
	estimate,
}: {
	estimate: Commerce.MappedShippingRate["delivery_estimate"];
}) {
	return (
		<span>
			{estimate.min_business_days}-{estimate.max_business_days} business days
		</span>
	);
}
