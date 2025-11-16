
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase URL and Anon Key must be provided in environment variables.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
