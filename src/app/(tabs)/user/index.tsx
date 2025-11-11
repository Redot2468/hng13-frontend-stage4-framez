import React from "react";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="flex-1"></ScrollView>
    </SafeAreaView>
  );
}
