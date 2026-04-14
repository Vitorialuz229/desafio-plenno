import { supabase } from "./supabase/supabase";

export async function getMembers() {
  return supabase.from("members").select("*");
}