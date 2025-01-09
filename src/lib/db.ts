import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { Product } from './commerce-types';
import { env } from '@/env.mjs';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export class CartDB {
  async createCart(): Promise<Cart> {
    const { data, error } = await supabase
      .from('carts')
      .insert([{ items: [] }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCart(id: string): Promise<Cart | null> {
    const { data, error } = await supabase
      .from('carts')
      .select()
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async updateCart(id: string, items: CartItem[]): Promise<void> {
    const { error } = await supabase
      .from('carts')
      .update({ items })
      .eq('id', id);

    if (error) throw error;
  }

  async deleteCart(id: string): Promise<void> {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapProduct(data);
  }

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const query = supabase
      .from('products')
      .select()
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
    if (!data || data.length === 0) {
      console.log('No featured products found');
      return [];
    }
    return data.map(this.mapProduct);
  }

  async getNewProducts(limit?: number): Promise<Product[]> {
    const query = supabase
      .from('products')
      .select()
      .eq('is_new', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching new products:', error);
      return [];
    }
    if (!data || data.length === 0) {
      console.log('No new products found');
      return [];
    }
    return data.map(this.mapProduct);
  }

  private mapProduct(product: any): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      currency: 'KES',
      images: product.image ? [product.image] : [],
      metadata: {
        stock: product.stock_quantity,
        brand: product.brand,
        color: product.color,
        weight: product.weight,
        dimensions: product.dimensions,
        features: product.features,
        slug: product.id,
      },
      default_price: {
        unit_amount: product.price * 100, // Convert to cents
        currency: 'KES'
      }
    };
  }
}

export const db = new CartDB();

export const getFeaturedProducts = (limit?: number) => db.getFeaturedProducts(limit);
export const getNewProducts = (limit?: number) => db.getNewProducts(limit);
