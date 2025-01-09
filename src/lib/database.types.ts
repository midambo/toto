export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image: string | null
          category: string | null
          age_range: string | null
          brand: string | null
          color: string | null
          stock_quantity: number
          weight: number | null
          dimensions: string | null
          features: Json | null
          is_featured: boolean
          is_new: boolean
          discount_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image?: string | null
          category?: string | null
          age_range?: string | null
          brand?: string | null
          color?: string | null
          stock_quantity?: number
          weight?: number | null
          dimensions?: string | null
          features?: Json | null
          is_featured?: boolean
          is_new?: boolean
          discount_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image?: string | null
          category?: string | null
          age_range?: string | null
          brand?: string | null
          color?: string | null
          stock_quantity?: number
          weight?: number | null
          dimensions?: string | null
          features?: Json | null
          is_featured?: boolean
          is_new?: boolean
          discount_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image: string | null
          slug: string
          parent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image?: string | null
          slug: string
          parent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image?: string | null
          slug?: string
          parent_id?: string | null
          created_at?: string
        }
      }
      carts: {
        Row: {
          id: string
          items: Json
          created_at: number
          updated_at: number
        }
        Insert: {
          id?: string
          items?: Json
          created_at: number
          updated_at: number
        }
        Update: {
          id?: string
          items?: Json
          created_at?: number
          updated_at?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
