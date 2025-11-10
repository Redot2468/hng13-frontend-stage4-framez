import LoginForm from "@/src/components/auth/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <LoginForm />
    </SafeAreaView>
  );
}
