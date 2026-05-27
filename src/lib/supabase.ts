import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vbjmfiwxtxdhgetolafq.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiam1maXd4dHhkaGdldG9sYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Mjc3NTIsImV4cCI6MjA5NTQwMzc1Mn0.aVeb3LFVzbcefZZpXLTjgyEASJ3WfT9sbTiBheqvnrw';

export const supabase = createClient(supabaseUrl, supabaseKey);
