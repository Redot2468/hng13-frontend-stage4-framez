import { PostSchema, PostSchemaType } from "@/src/lib/schema/post-schema";
import { supabase } from "@/src/lib/supabase";
import { queryClient } from "@/src/lib/tanstack-query/query-client";
import { getSession } from "@/src/utils/user-session";
import { decode } from "base64-arraybuffer";

export async function createPostAction(
  formData: PostSchemaType,
  base64Image: string | null | undefined,
  imageMimeType: string | null | undefined
) {
  const user = await getSession();

  if (!user?.id || !user?.user_id) {
    return { error: "You are not permitted to carry out this operation." };
  }

  const validatingData = PostSchema.safeParse(formData);
  if (!validatingData?.success) {
    const inputsWithErrors = Object.keys(
      validatingData?.error?.flatten()?.fieldErrors
    );

    return {
      error: `Something went wrong validating this fields: ${inputsWithErrors?.join(", ")}`,
    };
  }

  const { content } = validatingData?.data;
  try {
    let publicUrl;

    if (base64Image && imageMimeType) {
      // creating image extension and converting base64 to an image with url44=
      const extension = imageMimeType.split("/")[1];
      const fileName = `${Date.now()}.${extension}`;
      const pureBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("framez")
        .upload(fileName, decode(pureBase64), { contentType: imageMimeType });

      if (mediaError) {
        throw new Error(`Media: ${mediaError?.message}`);
      }

      const { data } = supabase.storage.from("framez").getPublicUrl(fileName);

      publicUrl = data?.publicUrl;
    }

    // create post.
    const { error } = await supabase.from("posts").insert([
      {
        content,
        postimage: publicUrl,
        user_id: user?.user_id,
        profile_id: user?.id,
      },
    ]);

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      throw new Error(error?.message);
    }

    // Revalidate data fetching to refetch data
    queryClient.invalidateQueries({ queryKey: ["feeds"] });

    return { success: "Post successfully published" };
  } catch (error) {
    if (error instanceof Error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }

      return { error: "Something went wrong publishing post" };
    }
  }
}
