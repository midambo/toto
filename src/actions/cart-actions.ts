"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCartCookieJson, setCartCookie, CART_COOKIE } from "@/lib/cart";
import * as Commerce from "@/lib/commerce";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

export async function getCartFromCookiesAction() {
  const cartId = await cookies().get(CART_COOKIE)?.value;
  if (!cartId) {
    return null;
  }

  try {
    const { id } = getCartCookieJson(cartId);
    return await db.getCart(id);
  } catch {
    return null;
  }
}

export async function setInitialCartCookiesAction(cartId: string, linesCount: number) {
  setCartCookie({ id: cartId, linesCount });
  revalidatePath(`cart-${cartId}`);
}

export async function findOrCreateCartIdFromCookiesAction() {
  const existingCartId = await cookies().get(CART_COOKIE)?.value;
  if (existingCartId) {
    try {
      const { id } = getCartCookieJson(existingCartId);
      const existingCart = await db.getCart(id);
      if (existingCart) {
        return id;
      }
    } catch {}
  }

  const newCartId = uuidv4();
  setCartCookie({ id: newCartId, linesCount: 0 });
  return newCartId;
}

export async function deleteCartCookiesAction() {
  const cartId = await cookies().get(CART_COOKIE)?.value;
  if (!cartId) {
    return;
  }

  try {
    const { id } = getCartCookieJson(cartId);
    await db.deleteCart(id);
    cookies().delete(CART_COOKIE);
    revalidatePath(`cart-${id}`);
  } catch {}
}

export async function addToCartAction(productId: string) {
  const cartId = await findOrCreateCartIdFromCookiesAction();
  const cart = await db.getCart(cartId);
  const product = await Commerce.getProduct(productId);
  
  if (!cart || !product) {
    throw new Error("Invalid cart or product");
  }

  const existingItem = cart.items.find(item => item.productId === productId);
  const updatedItems = existingItem
    ? cart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...cart.items, { productId, quantity: 1 }];

  await db.updateCart(cartId, updatedItems);
  revalidatePath(`cart-${cartId}`);
}

export async function updateQuantityAction(cartId: string, productId: string, quantity: number) {
  const cart = await db.getCart(cartId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  const updatedItems = quantity > 0
    ? cart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    : cart.items.filter(item => item.productId !== productId);

  await db.updateCart(cartId, updatedItems);
  revalidatePath(`cart-${cartId}`);
}

export async function increaseQuantity(productId: string) {
  const cartId = await findOrCreateCartIdFromCookiesAction();
  const cart = await db.getCart(cartId);
  
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(item => item.productId === productId);
  if (item) {
    await updateQuantityAction(cartId, productId, item.quantity + 1);
  } else {
    await addToCartAction(productId);
  }
}

export async function decreaseQuantity(productId: string) {
  const cartId = await findOrCreateCartIdFromCookiesAction();
  const cart = await db.getCart(cartId);
  
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(item => item.productId === productId);
  if (item) {
    await updateQuantityAction(cartId, productId, item.quantity - 1);
  }
}

export async function clearCartCookieAction() {
  cookies().delete(CART_COOKIE);
}
