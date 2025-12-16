# Admin Panel Setup Guide

## Prerequisites

1. Supabase project with Authentication enabled
2. Database schema with `users` table (see `supabase/users-schema.sql`)

## Setup Steps

### 1. Run the Database Schema

Execute the SQL in `supabase/users-schema.sql` in your Supabase SQL editor to create the users table and necessary policies.

### 2. Create an Admin User

#### Option A: Via Supabase Dashboard
1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user" > "Create new user"
3. Enter email and password for your admin user
4. After the user is created, note their user ID

#### Option B: Via SQL
```sql
-- First, create the auth user (this is typically done via Supabase Auth API or Dashboard)
-- Then update the users table to set role to admin:
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@example.com';
```

### 3. Environment Variables

Ensure your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Access the Admin Panel

1. Navigate to `/admin/login`
2. Enter your admin email and password
3. You'll be redirected to the admin dashboard

## Security Features

- **Middleware Protection**: All `/admin/*` routes are protected by middleware
- **Role Verification**: Users must have `role = 'admin'` in the `users` table
- **Session Management**: Automatic session validation and refresh
- **Logout**: Secure logout that clears session and redirects to login

## Troubleshooting

### "User not found in system"
- Ensure the user exists in the `users` table
- Check that the user's ID matches between `auth.users` and `public.users`

### "You do not have admin privileges"
- Verify the user's role is set to 'admin' in the `users` table
- Run: `SELECT * FROM public.users WHERE email = 'your-email@example.com';`

### Middleware not working
- Check that middleware.ts is in the root directory
- Verify the matcher pattern matches your admin routes
- Check browser console for cookie/session issues

## Creating Additional Admin Users

To add more admin users:
1. Create the user in Supabase Authentication
2. Update their role in the database:
   ```sql
   UPDATE public.users 
   SET role = 'admin' 
   WHERE email = 'newadmin@example.com';
   ```

