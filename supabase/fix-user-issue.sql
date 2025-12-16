-- Fix: Add missing user to users table
-- Run this in your Supabase SQL Editor

-- Option 1: Manually add a user (replace with your actual user ID and email)
-- First, get your user ID from Authentication > Users in Supabase dashboard
-- Then run:
INSERT INTO public.users (id, email, role)
VALUES (
    'YOUR_USER_ID_HERE',  -- Replace with actual UUID from auth.users
    'your-email@example.com',  -- Replace with your email
    'admin'  -- Set to 'admin' for admin access, or 'user' for regular user
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', email = EXCLUDED.email;

-- Option 2: Add RLS policy to allow users to insert their own record
-- This allows the login code to automatically create user records
CREATE POLICY "Users can insert own record" ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Option 3: Update existing user to admin role
-- If user already exists but isn't admin:
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- To check if your user exists:
SELECT * FROM public.users WHERE email = 'your-email@example.com';

-- To see all users in auth.users:
SELECT id, email, created_at FROM auth.users;

