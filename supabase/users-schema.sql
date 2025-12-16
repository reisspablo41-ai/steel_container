-- Users Table for Admin Authentication
-- This table stores user information and roles
-- Note: Supabase Auth handles authentication, this table stores additional user data

create table if not exists public.users (
    id uuid references auth.users(id) on delete cascade primary key,
    email text unique not null,
    role text not null default 'user', -- 'admin' or 'user'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Policy: Users can read their own data
create policy "Users can read own data" on public.users
    for select using (auth.uid() = id);

-- Policy: Admins can read all users
create policy "Admins can read all users" on public.users
    for select using (
        exists (
            select 1 from public.users
            where id = auth.uid() and role = 'admin'
        )
    );

-- Policy: Service role can do everything (for admin operations)
create policy "Service role full access" on public.users
    for all using (true);

-- Function to automatically create user record when auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, email, role)
    values (new.id, new.email, 'user');
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to create user record on signup
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Example: To create an admin user, you would:
-- 1. Create the user in Supabase Auth (via dashboard or API)
-- 2. Then update the users table:
-- UPDATE public.users SET role = 'admin' WHERE email = 'admin@example.com';

