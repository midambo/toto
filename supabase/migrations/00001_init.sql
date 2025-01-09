-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    category TEXT,
    age_range TEXT,
    brand TEXT,
    color TEXT,
    stock_quantity INTEGER DEFAULT 0,
    weight DECIMAL(5,2),
    dimensions TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    discount_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    slug TEXT UNIQUE NOT NULL,
    parent_id TEXT REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create carts table
CREATE TABLE IF NOT EXISTS carts (
    id TEXT PRIMARY KEY,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_age_range ON products(age_range);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_carts_updated ON carts(updated_at);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Add RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
TO public 
USING (true);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT 
TO public 
USING (true);

-- Carts policies
CREATE POLICY "Carts are insertable by everyone" 
ON carts FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Carts are viewable by everyone" 
ON carts FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Carts are updatable by everyone" 
ON carts FOR UPDATE
TO public 
USING (true);

CREATE POLICY "Carts are deletable by everyone" 
ON carts FOR DELETE
TO public 
USING (true);

-- Insert sample categories
INSERT INTO categories (id, name, description, slug, image) VALUES
('cat_skates', 'Skates', 'Roller skates and inline skates for kids', 'skates', '/images/categories/skates.jpg'),
('cat_bikes', 'Bicycles', 'Kids bicycles for all ages', 'bicycles', '/images/categories/bicycles.jpg'),
('cat_trikes', 'Tricycles', 'Tricycles for toddlers and young children', 'tricycles', '/images/categories/tricycles.jpg'),
('cat_scooters', 'Scooters', 'Kids scooters for fun and mobility', 'scooters', '/images/categories/scooters.jpg'),
('cat_toys', 'Toys', 'Educational and fun toys for children', 'toys', '/images/categories/toys.jpg');

-- Insert sample products
INSERT INTO products (
    id, name, description, price, image, category, 
    age_range, brand, color, stock_quantity, 
    features, is_featured, is_new
) VALUES
-- Skates
('prod_skate1', 'Adjustable Inline Skates', 'Comfortable adjustable inline skates with light-up wheels', 4999.00, '/images/products/inline-skates-1.jpg', 'skates', 
'6-12 years', 'RollerFun', 'Blue/Pink', 25, 
'["Adjustable size", "Light-up wheels", "Comfortable padding", "Easy-to-use buckle system"]', true, true),

-- Bicycles
('prod_bike1', 'Kids Mountain Bike 20"', 'Durable mountain bike with 6 speeds and safety features', 12999.00, '/images/products/bike-1.jpg', 'bicycles',
'7-12 years', 'KidsBike', 'Red/Black', 15, 
'["6-speed Shimano gears", "Front suspension", "Safety reflectors", "Easy-grip handles"]', true, false),

-- Tricycles
('prod_trike1', 'Toddler Tricycle with Push Handle', 'Safe and sturdy tricycle with parent control handle', 3499.00, '/images/products/trike-1.jpg', 'tricycles',
'1-4 years', 'TinyRider', 'Yellow', 30, 
'["Removable parent handle", "Safety harness", "Storage basket", "Adjustable seat"]', true, true),

-- Scooters
('prod_scoot1', 'Kids Foldable Scooter', 'Lightweight foldable scooter with light-up wheels', 2999.00, '/images/products/scooter-1.jpg', 'scooters',
'3-10 years', 'ScootKids', 'Purple', 40, 
'["Foldable design", "Light-up wheels", "Adjustable handlebar", "Anti-slip deck"]', false, true),

-- Toys
('prod_toy1', 'Building Blocks Set', 'Educational building blocks set with 100 pieces', 1499.00, '/images/products/blocks-1.jpg', 'toys',
'3+ years', 'EduPlay', 'Multicolor', 50, 
'["100 pieces", "Non-toxic materials", "Storage container included", "Educational value"]', false, true);

-- Add more sample products as needed
