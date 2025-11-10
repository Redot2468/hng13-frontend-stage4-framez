import { supabase } from "@/src/lib/supabase";

export async function getUser() {
  const user = await supabase.auth.getUser();

  return user?.data?.user;
}
