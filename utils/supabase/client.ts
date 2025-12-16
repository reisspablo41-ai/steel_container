
import { createClient } from '@supabase/supabase-js';

// Handle potential typos in environment variables as reported by user
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPBASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPBASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPBASE_SECRET_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
