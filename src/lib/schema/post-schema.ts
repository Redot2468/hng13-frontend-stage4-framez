import * as z from "zod";

export const PostSchema = z.object({
  content: z
    .string()
    .min(1, "Post content is required")
    .max(2000, "Post is too long"),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
