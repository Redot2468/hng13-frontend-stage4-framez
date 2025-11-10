import { Stack, useRouter, useSegments } from "expo-router";

import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../styles/globals.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (sessionLoading) {
      return;
    }

    const isPrivateRoute = segments[0] === "(tabs)";
    const isAuthRoute = segments[0] === "(auth)";

    if (!session && isAuthRoute) {
      return;
    }

    if (!session && isPrivateRoute) {
      router.push("/(auth)/login");
    }

    if (session && !isPrivateRoute) {
      router.push("/(tabs)");
    }
  }, [session, segments, sessionLoading, router]);

  if (sessionLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <View className=" items-center justify-center h-screen">
            <Text className="text-lg">Session loading...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <Stack screenOptions={{ headerShown: false }} />
      <Toast position="top" />
    </SafeAreaProvider>
  );
}
