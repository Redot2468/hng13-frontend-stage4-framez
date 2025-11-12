import InputField from "@/src/components/ui/Inputfield";
import Logo from "@/src/components/ui/Logo";
import { signupAction } from "@/src/lib/actions/auth-action";
import { SignupSchema, SignupSchemaType } from "@/src/lib/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignupForm() {
  const router = useRouter();
  const { handleSubmit, watch, formState, control, reset } =
    useForm<SignupSchemaType>({
      resolver: zodResolver(SignupSchema),
    });

  const { name, email, password } = formState.errors;
  const formInputsValues = Object.values(watch());
  const [isSigningUp, startTransition] = useTransition();
  const areAllInputsFilled = formInputsValues?.every((value) => value);

  function onSubmit(formData: SignupSchemaType) {
    startTransition(async () => {
      const res = await signupAction(formData);

      if (res?.data) {
        Toast.show({
          type: "success",
          text1: "Registration succesful",
          text2: `Welcome to Framez, ${res?.data?.user_metadata?.name}`,
        });

        reset();
      }

      if (res?.error) {
        Toast.show({
          type: "error",
          text1: "Sign up failed",
          text2: res.error as string,
        });
      }
    });
  }

  return (
    <ScrollView>
      <View className=" items-center justify-center h-screen gap-7 px-6 ">
        <Logo />
        <View className="justify-center items-center gap-2">
          <Text className="text-3xl  font-bold">Sign up</Text>
          <Text className="">Sign up to begin interacting with people</Text>
        </View>

        <View className="w-full gap-4 mt-3">
          <InputField
            placeholder="Your name"
            name="name"
            error={name?.message}
            control={control}
            disabled={isSigningUp}
          />

          <InputField
            placeholder="Email address"
            name="email"
            error={email?.message}
            control={control}
            disabled={isSigningUp}
          />

          <InputField
            placeholder="Password"
            name="password"
            error={password?.message}
            control={control}
            disabled={isSigningUp}
          />

          <Pressable
            className="bg-neutral-900 px-6 flex-row items-center justify-center py-4 rounded-md mt-2 disabled:opacity-70"
            onPress={handleSubmit(onSubmit)}
            disabled={!areAllInputsFilled || isSigningUp}
          >
            <Text className="text-white font-medium">
              {isSigningUp ? "Signing up..." : "Sign up"}
            </Text>
          </Pressable>
        </View>

        <Text className="text-neutral-500">
          Already have an account?{" "}
          <Text
            className="underline font-bold text-neutral-950"
            onPress={() => router.push("/login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
