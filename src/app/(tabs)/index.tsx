import Feeds from "@/src/components/post/Feeds";
import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-6 py-6 bg-white  flex flex-col ">
        <Text className="text-2xl font-bold ">Feeds</Text>

        {/* Posts: Todo: Put them in a seperate component */}
        <Feeds />
      </ScrollView>
    </SafeAreaView>
  );
}
