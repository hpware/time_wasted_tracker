import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxzsbiunmyqmxaldtjfp.supabase.co";
const supabaseAnonKey = process.env.EXPO_SUPABASE_ANON || ""; // I don't want to hard code it, since we are publishing to github.

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
