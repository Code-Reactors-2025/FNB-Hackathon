import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://fvvjlaedmftclupcaeph.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dmpsYWVkbWZ0Y2x1cGNhZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzU5NjIsImV4cCI6MjA3NjkxMTk2Mn0.Hxdw3BXV3DNoYUt0fY6gXdL4q-o4XnMLb7ACT4R5utQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);