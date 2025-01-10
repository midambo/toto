"use client";

import { formatMoney, formatProductName } from "@/lib/utils";
import * as Commerce from "@/lib/commerce";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";
import { YnsLink } from "@/ui/yns-link";
import Image from "next/image";

export const CartSummaryTable = ({ cart, locale }: { cart: Commerce.Cart; locale: string }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.lines.map((line) => (
          <TableRow key={line.product.id}>
            <TableCell>
              <div className="flex gap-2">
                {line.product.images[0] && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={line.product.images[0]}
                      alt={line.product.name}
                      className="object-cover"
                      fill
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <YnsLink
                    href={`/product/${line.product.metadata.slug}`}
                    className="font-medium hover:underline"
                  >
                    {formatProductName(line.product.name, line.product.metadata.variant)}
                  </YnsLink>
                  <p className="text-sm text-muted-foreground">Qty: {line.quantity}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              {formatMoney({
                amount: line.product.default_price.unit_amount ?? 0,
                currency: line.product.default_price.currency,
                locale,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Subtotal</TableCell>
          <TableCell className="text-right">
            {formatMoney({
              amount: Commerce.calculateCartTotal(cart),
              currency: cart.lines[0]!.product.default_price.currency,
              locale,
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
