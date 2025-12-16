-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text,
  price decimal(10,2) not null default 0.00,
  size text not null, -- e.g., '20ft', '40ft'
  type text not null, -- e.g., 'Standard', 'High Cube'
  condition text not null, -- e.g., 'New', 'Used - WWT'
  images text[] default array[]::text[], -- Array of image URLs
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  company_name text,
  shipping_address text,
  status text not null default 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
  total_amount decimal(10,2) not null default 0.00,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null default 1,
  unit_price decimal(10,2) not null, -- Price at time of purchase
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies (Simple public read for products, open creation for orders)
-- In a real app, you'd restrict 'update'/'delete' to admins only.

-- Products: Everyone can read
create policy "Products are viewable by everyone" on public.products
  for select using (true);

-- Products: Only service_role can insert/update/delete (or authenticated admins)
-- For now, enabling public insert for seeding/admin-dashboard simplicity if using anon key, 
-- BUT highly recommend using service_role for admin actions. 
-- We will assume the Admin Dashboard uses the same client but might need RLS tweaks if auth isn't set up.
-- defined below allows anon to create for the sake of the demo 'admin' panel if no auth is present. 
-- WARNING: In production, lock this down!
create policy "Allow public insert for demo admin" on public.products
  for insert with check (true);
create policy "Allow public update for demo admin" on public.products
  for update using (true);
create policy "Allow public delete for demo admin" on public.products
  for delete using (true);


-- Orders: Everyone can create (checkout)
create policy "Public can create orders" on public.orders
  for insert with check (true);

-- Orders: Viewable only by creator? Or just public for demo admin?
create policy "Enable read access for all users" on public.orders
  for select using (true);

create policy "Enable update for all users" on public.orders
  for update using (true);

-- Order Items
create policy "Public can create order items" on public.order_items
  for insert with check (true);
create policy "Enable read access for all users" on public.order_items
  for select using (true);
