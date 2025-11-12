import LoginInputField from "@/src/components/ui/LoginInputField";
import Logo from "@/src/components/ui/Logo";
import { loginAction } from "@/src/lib/actions/auth-action";
import { LoginSchema, LoginSchemaType } from "@/src/lib/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginForm() {
  const router = useRouter();
  const [isLoggingIn, startTransition] = useTransition();
  const { handleSubmit, reset, watch, formState, control } =
    useForm<LoginSchemaType>({
      resolver: zodResolver(LoginSchema),
    });

  const { email, password } = formState.errors;
  const formInputsValues = Object.values(watch());
  const areAllInputsFilled = formInputsValues?.every((value) => value);

  function onSubmit(formData: LoginSchemaType) {
    startTransition(async () => {
      const res = await loginAction(formData);

      if (res?.success) {
        reset();
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: `Welcome back, ${res?.success?.user?.user_metadata?.name}`,
        });
      }
      if (res?.error) {
        Toast.show({
          type: "error",
          text1: "Sign in error",
          text2: res?.error,
        });
      }
    });
  }

  return (
    <ScrollView>
      <View className=" items-center justify-center h-screen gap-7 px-6 bg-white">
        <Logo />
        <View className="justify-center items-center gap-2">
          <Text className="text-3xl  font-bold">Sign in</Text>
          <Text className="">Sign in to continue interacting with people</Text>
        </View>

        <View className="w-full gap-4 mt-3">
          <LoginInputField
            placeholder="Email address"
            name="email"
            error={email?.message}
            control={control}
            editable={!isLoggingIn}
          />

          <LoginInputField
            placeholder="Password"
            name="password"
            error={password?.message}
            control={control}
            editable={!isLoggingIn}
          />

          <Pressable
            className="bg-neutral-900 px-6 flex-row items-center justify-center py-4 rounded-md mt-2 disabled:opacity-70"
            onPress={handleSubmit(onSubmit)}
            disabled={!areAllInputsFilled || isLoggingIn}
          >
            <Text className="text-white font-medium">
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Text>
          </Pressable>
        </View>

        <Text className="text-neutral-500">
          Don&apos;t have an account?{" "}
          <Text
            className="underline font-bold text-neutral-950"
            onPress={() => router.push("/(auth)/signup")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
