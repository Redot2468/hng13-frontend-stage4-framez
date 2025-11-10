import { signOutAction } from "@/src/lib/actions/auth-action";
import { useRouter } from "expo-router";
import { useTransition } from "react";
import { Button, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const router = useRouter();
  const [isSigningOut, startTransition] = useTransition();

  // temporary remove later

  function onSignOut() {
    startTransition(async () => {
      const res = await signOutAction();
      if (res?.error) {
        Toast.show({
          type: "error",
          text1: "Sign out error",
          text2: res.error,
        });
      }
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="signup" onPress={() => router.replace("/signup")}></Button>

      <Button title="sign out" onPress={onSignOut}></Button>
    </View>
  );
}

// create signout functionality
// create signin functionality
