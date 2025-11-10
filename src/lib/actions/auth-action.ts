import {
  LoginSchema,
  LoginSchemaType,
  SignupSchema,
  SignupSchemaType,
} from "@/src/lib/schema/auth-schema";
import { supabase } from "@/src/lib/supabase";
import { getUser } from "@/src/utils/user-session";

export async function loginAction(formData: LoginSchemaType) {
  const validatingData = LoginSchema.safeParse(formData);
  if (!validatingData?.success) {
    const inputsFieldsWithErrors = Object.keys(
      validatingData?.error?.flatten()?.fieldErrors
    );

    return {
      error: `Something went wrong validating this input fields: ${inputsFieldsWithErrors.join(", ")}`,
    };
  }

  const { email, password } = validatingData?.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return { error: "Something went wrong signing user in" };
  }

  return { success: data };
}

export async function signOutAction() {
  const user = await getUser();
  if (!user?.id) {
    return { error: "You are not allowed to carry out this operation" };
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return { error: "Something went wrong signing you out" };
  }
}

export async function signupAction(formData: SignupSchemaType) {
  const validatingData = SignupSchema.safeParse(formData);
  if (!validatingData?.success) {
    const errorInputs = validatingData?.error?.flatten().fieldErrors;

    const inputFieldsError = Object.keys(errorInputs).join(", ");

    return {
      error: `Invalid input values for the following input fields: ${inputFieldsError}`,
    };
  }

  const { name, email, password } = validatingData?.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: error?.message };
  }

  if (data?.user) {
    const { error: userProfileError } = await supabase
      .from("users")
      .insert([{ name, email, avatar: "", user_id: data?.user?.id }])
      .select();

    if (userProfileError) {
      return { error: userProfileError };
    }

    return { data: data?.user };
  }

  return { error: "Something went wrong" };
}
