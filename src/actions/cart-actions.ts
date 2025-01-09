'use server';

import { cookies } from 'next/headers';
import { getCartCookieJson, setCartCookie, CART_COOKIE } from "@/lib/cart";
import * as Commerce from "@/lib/commerce";
import { db } from "@/lib/db";

export async function getCartFromCookiesAction() {
  const cartCookie = await cookies().get(CART_COOKIE);
  if (!cartCookie?.value) {
    return null;
  }

  try {
    const { id } = getCartCookieJson(cartCookie.value);
    return await db.getCart(id);
  } catch {
    return null;
  }
}

export async function findOrCreateCartIdFromCookiesAction() {
  const cartCookie = await cookies().get(CART_COOKIE);
  if (cartCookie?.value) {
    try {
      const { id } = getCartCookieJson(cartCookie.value);
      const existingCart = await db.getCart(id);
      if (existingCart) {
        return id;
      }
    } catch {}
  }

  // Generate a simple timestamp-based ID
  const newCartId = `cart_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  setCartCookie({ id: newCartId, linesCount: 0 });
  return newCartId;
}

export async function deleteCartCookiesAction() {
  const cartCookie = await cookies().get(CART_COOKIE);
  if (!cartCookie?.value) {
    return;
  }

  try {
    const { id } = getCartCookieJson(cartCookie.value);
    await db.deleteCart(id);
    cookies().delete(CART_COOKIE);
  } catch {
    // Ignore errors when deleting
  }
}

export async function addToCartAction(cartId: string, productId: string) {
  const cart = await db.getCart(cartId);
  if (!cart) {
    return;
  }

  const existingItem = cart.items.find((item) => item.product_id === productId);
  if (existingItem) {
    await updateQuantityAction(cartId, productId, existingItem.quantity + 1);
  } else {
    await db.addToCart(cartId, productId);
    const updatedCart = await db.getCart(cartId);
    if (updatedCart) {
      setCartCookie({ id: cartId, linesCount: updatedCart.items.length });
    }
  }
}

export async function updateQuantityAction(
  cartId: string,
  productId: string,
  quantity: number
) {
  if (quantity < 0) {
    return;
  }

  if (quantity === 0) {
    await db.removeFromCart(cartId, productId);
  } else {
    await db.updateCartItemQuantity(cartId, productId, quantity);
  }

  const updatedCart = await db.getCart(cartId);
  if (updatedCart) {
    setCartCookie({ id: cartId, linesCount: updatedCart.items.length });
  }
}

export async function removeFromCartAction(cartId: string, productId: string) {
  await updateQuantityAction(cartId, productId, 0);
}

export async function decrementQuantityAction(cartId: string, productId: string) {
  const cart = await db.getCart(cartId);
  if (!cart) {
    return;
  }

  const item = cart.items.find((item) => item.product_id === productId);
  if (item) {
    await updateQuantityAction(cartId, productId, item.quantity - 1);
  }
}
