import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Handle potential typos in environment variables as reported by user
function getSupabaseConfig() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPBASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPBASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPBASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (typeof window !== 'undefined') {
      // Only log error in browser, not during build
      console.error(
        'Missing Supabase environment variables. Please check your .env file.'
      );
    }
    // Return placeholder values during build/SSR if env vars are missing
    return {
      url: supabaseUrl || 'https://placeholder.supabase.co',
      key: supabaseKey || 'placeholder-key',
    };
  }

  return { url: supabaseUrl, key: supabaseKey };
}

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const config = getSupabaseConfig();
    supabaseClient = createClient(config.url, config.key);
  }
  return supabaseClient;
}

export const supabase = getSupabaseClient();
