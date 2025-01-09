export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  images: string[];
  metadata: Record<string, any>;
  default_price: {
    unit_amount: number;
    currency: string;
  };
}

export interface Cart {
  id: string;
  currency: string;
  subtotal: number;
  total: number;
  lines: Array<{
    quantity: number;
    product: Product;
  }>;
}

export interface ShippingRate {
  id: string;
  name: string;
  amount: number;
  currency: string;
  delivery_estimate: {
    minimum: {
      unit: string;
      value: number;
    };
    maximum: {
      unit: string;
      value: number;
    };
  };
}

export interface Store {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  metadata: Record<string, any>;
}
