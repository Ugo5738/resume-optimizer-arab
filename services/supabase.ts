
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_CONFIGURED } from '../config';

if (!SUPABASE_CONFIGURED) {
  console.error(
    'Supabase client is using fallback credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment before deploying.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
