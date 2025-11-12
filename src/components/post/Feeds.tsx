import PostCard from "@/src/components/post/PostCard";
import PostSkeleton from "@/src/components/skeletons/PostSkeletons";
import { getFeeds } from "@/src/lib/services/feeds-service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

export default function Feeds() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["feeds"],
    queryFn: () => getFeeds(),
    staleTime: 600,
  });

  if (isLoading) {
    return (
      <View className="mt-3 pb-32">
        {Array.from({ length: 6 })?.map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex items-center justify-center mt-20">
        <Text className="text-center">{error?.message}</Text>
      </View>
    );
  }

  return (
    <View className=" mt-3 pb-32">
      {/* each post */}

      {data?.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
    </View>
  );
}
