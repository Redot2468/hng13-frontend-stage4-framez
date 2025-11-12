import { supabase } from "@/src/lib/supabase";
import { getSession, getUser } from "@/src/utils/user-session";
import { router } from "expo-router";

export async function getUserFeeds() {
  const user = await getSession();
  if (!user?.id || !user?.user_id) {
    router.push("/login");
    return;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles!posts_profile_id_fkey (id, name, email, avatar)")
    .eq("profile_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    if (process.env.NODE_ENV) {
      console.error(error);
    }

    throw new Error("An Error occured trying to get user personal feeds.");
  }

  console.log(data, "data:");
  return data;
}

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
