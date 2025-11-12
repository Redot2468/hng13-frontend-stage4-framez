import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { cache } from "react";

export async function getUser() {
  const user = await supabase.auth.getUser();

  return user?.data?.user;
}

export const getSession = cache(async function () {
  const user = await getUser();
  if (!user?.id) {
    router.push("/login");
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    throw new Error("Something went wrong getting using profile");
  }

  return data?.at(0);
});
