import { Cart, CartItem, Product } from './db';

export function calculateCartTotalNetWithoutShipping(cart: Cart, products: Product[]): number {
  return cart.items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    
    const price = product.price;
    const discountedPrice = price * (1 - (product.discount_percentage || 0) / 100);
    return total + (discountedPrice * item.quantity);
  }, 0);
}

export function calculateCartSubtotal(cart: Cart, products: Product[]): number {
  return cart.items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    return total + (product.price * item.quantity);
  }, 0);
}

export function calculateCartTotal(cart: Cart, products: Product[], shippingCost: number = 0): number {
  const subtotal = calculateCartTotalNetWithoutShipping(cart, products);
  return subtotal + shippingCost;
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
