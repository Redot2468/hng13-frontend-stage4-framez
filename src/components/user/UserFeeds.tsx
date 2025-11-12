import PostCard from "@/src/components/post/PostCard";
import { getUserFeeds } from "@/src/lib/services/feeds-service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

export default function UserFeeds() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user-feeds"],
    queryFn: getUserFeeds,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error?.message}</Text>;
  }

  return (
    <View className="mt-10 px-6">
      <Text className="text-2xl font-bold capitalize mt-">Your posts</Text>

      <View className=" mt-3 ">
        {/* each post */}

        {data?.map((post) => (
          <PostCard key={post?.id} post={post} />
        ))}
      </View>
    </View>
  );
}
