import CreateForm from "@/src/components/post/CreateForm";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <CreateForm />
    </SafeAreaView>
  );
}
