import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email address is required" })
    .trim(),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(1200, { message: "Enter a valid password" }),
});

export const SignupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Your name is required" })
    .max(255, { message: "Enter a valid name" })
    .trim(),

  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .min(1, { message: "Email address is required" })
    .max(255, { message: "Enter a valid email address" })
    .trim(),

  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(/(?=.*[a-zA-Z])/, "Password must contain at least one letter")
    .max(100, "Password is too long"),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
