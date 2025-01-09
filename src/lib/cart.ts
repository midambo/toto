import { cookies } from "next/headers";

export const CART_COOKIE = "cart";

export interface CartCookieJson {
  id: string;
  linesCount: number;
}

export function getCartCookieJson(cookieValue: string): CartCookieJson {
  return JSON.parse(cookieValue) as CartCookieJson;
}

export function setCartCookie(cart: CartCookieJson): void {
  cookies().set(CART_COOKIE, JSON.stringify(cart));
}
