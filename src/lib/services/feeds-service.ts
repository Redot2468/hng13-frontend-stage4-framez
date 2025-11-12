import { supabase } from "@/src/lib/supabase";
import { getUser } from "@/src/utils/user-session";

export async function getFeeds() {
  const user = await getUser();

  if (!user?.id)
    throw new Error("You do not have the permission to carry out this action");

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles!posts_profile_id_fkey (id, name, email, avatar)")
    .order("created_at", { ascending: false });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    throw new Error("Something went wrong fetching data.");
  }

  return data;
}
