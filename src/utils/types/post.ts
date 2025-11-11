import { Database } from "@/src/utils/types/database.types";

export type PostRow = Database["public"]["Tables"]["posts"]["Row"];

export type ProfilesRow = Database["public"]["Tables"]["profiles"]["Row"];

export interface Post extends PostRow {
  profiles: {
    id: string;
    name: string | null;
    email: string | null;
    avatar: string | null;
  } | null;
}
