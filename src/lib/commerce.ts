import { Cart, Product, ShippingRate, Store } from './commerce-types';

// Mock data
const mockProducts: Product[] = [
  {
    id: "mock_product_1",
    name: "Mock Product 1",
    description: "A mock product for development",
    price: 1999,
    currency: "USD",
    images: [],
    metadata: {},
    default_price: {
      unit_amount: 1999,
      currency: "USD"
    }
  }
];

const mockShippingRates: ShippingRate[] = [
  {
    id: "mock_shipping_1",
    name: "Standard Shipping",
    amount: 499,
    currency: "USD",
    delivery_estimate: {
      minimum: {
        unit: "business_day",
        value: 3,
      },
      maximum: {
        unit: "business_day",
        value: 5,
      },
    },
  }
];

const mockStore: Store = {
  id: "mock_account",
  name: "Mock Store",
  description: "A mock store for development",
  logo: null,
  metadata: {},
};

// Commerce functions
export async function productBrowse({ first = 100 }: { first: number }): Promise<Product[]> {
  return mockProducts.slice(0, first);
}

export async function cartCreate(): Promise<Cart> {
  return {
    id: "mock_cart",
    currency: "USD",
    subtotal: 0,
    total: 0,
    lines: [],
  };
}

export async function cartRetrieve(cartId: string): Promise<Cart | null> {
  return {
    id: cartId || "mock_cart",
    currency: "USD",
    subtotal: 0,
    total: 0,
    lines: [],
  };
}

export async function getShippingRates(): Promise<ShippingRate[]> {
  return mockShippingRates;
}

export async function getStore(): Promise<Store> {
  return mockStore;
}

// Helper functions
export function calculateCartTotalNetWithoutShipping(cart: Cart): number {
  return cart.lines.reduce((total, line) => {
    return total + (line.product.default_price.unit_amount * line.quantity);
  }, 0);
}

export function calculateCartTotal(cart: Cart, shippingRate?: ShippingRate): number {
  const subtotal = calculateCartTotalNetWithoutShipping(cart);
  return subtotal + (shippingRate?.amount || 0);
}
