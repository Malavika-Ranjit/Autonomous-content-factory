// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://xljcigucrzylnpyouzeq.supabase.co";
// const supabaseAnonKey = "sb_publishable_rfoy_GCqXNn51p6gGh04MQ_sTySnTce";

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// // // b9wFctrNwkj89UJ7
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
