-- ==============================================================================
-- NEW DAWN TECHNOLOGIES - SUPABASE DATABASE SCHEMA
-- Execute this SQL in your Supabase project's SQL Editor (SQL Query tab).
-- ==============================================================================

-- 1. Create phones table
CREATE TABLE IF NOT EXISTS public.phones (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    storage VARCHAR(50) NOT NULL,
    storage_options TEXT[] DEFAULT '{}',
    condition VARCHAR(50) NOT NULL DEFAULT 'UK Used',
    colors TEXT[] DEFAULT '{}',
    image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    tagline TEXT,
    overview TEXT,
    price_note VARCHAR(255) DEFAULT 'Price on daily request (market rate)',
    specs JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for fast catalog browsing and slug lookups
CREATE INDEX IF NOT EXISTS idx_phones_slug ON public.phones (slug);
CREATE INDEX IF NOT EXISTS idx_phones_brand ON public.phones (brand);
CREATE INDEX IF NOT EXISTS idx_phones_condition ON public.phones (condition);
CREATE INDEX IF NOT EXISTS idx_phones_featured ON public.phones (featured);
CREATE INDEX IF NOT EXISTS idx_phones_in_stock ON public.phones (in_stock);

-- 3. Row Level Security (RLS)
ALTER TABLE public.phones ENABLE ROW LEVEL SECURITY;

-- Allow public read access (any visitor can browse active phone catalog)
CREATE POLICY "Public Read Access"
    ON public.phones
    FOR SELECT
    USING (true);

-- Allow authenticated admins to insert, update, delete
CREATE POLICY "Admin All Access"
    ON public.phones
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Inquiries tracking table (Optional future extension)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(100) NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL, -- 'device_price', 'custom_request', 'general'
    phone_slug VARCHAR(255),
    details JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Create Inquiry"
    ON public.inquiries
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin Manage Inquiries"
    ON public.inquiries
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
