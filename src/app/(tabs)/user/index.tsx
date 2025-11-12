import ProfileDetails from "@/src/components/user/ProfileDetails";
import UserFeeds from "@/src/components/user/UserFeeds";
import React from "react";
import { ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white pb-36">
      <ScrollView className="flex-1">
        <ProfileDetails />
        <UserFeeds />
      </ScrollView>
    </SafeAreaView>
  );
}
