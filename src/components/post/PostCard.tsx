import { POST_CHAR_LENGTH } from "@/src/utils/constants";
import { getLongTimeStamp, getTimestamp } from "@/src/utils/data-time";
import { Post } from "@/src/utils/types/post";

import { useState } from "react";

import { Image, Pressable, Text, View } from "react-native";

export default function PostCard({ post }: { post: Post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = post?.content?.length > POST_CHAR_LENGTH;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View
      key={post?.id}
      className="border-b flex-row gap-3 py-3 border-neutral-200"
    >
      <View className="size-11 rounded-full overflow-hidden">
        {post?.profiles?.avatar ? (
          <Image
            source={{ uri: post?.profiles?.avatar }}
            className="w-full h-full"
          />
        ) : (
          <Image
            source={require("../../assets/images/user.png")}
            className="object-contain w-full h-full"
          />
        )}
      </View>

      <View className="flex-1 mt-0.5">
        {/* name and timestamp */}
        <View className="flex items-center justify-between flex-row">
          <Text className="text-lg font-bold" style={{ fontWeight: 800 }}>
            {post?.profiles?.name}
          </Text>

          <Text className="text-neutral-500 font-bold">
            {getTimestamp(post?.created_at)}
          </Text>
        </View>

        {/* content */}

        <Text>
          {isLongText && isExpanded ? (
            <>
              {post.content}
              <Pressable onPress={toggleExpand}>
                <Text className="text-neutral-500"> Show less</Text>
              </Pressable>
            </>
          ) : isLongText && !isExpanded ? (
            <>
              {`${post.content.slice(0, POST_CHAR_LENGTH)}...`}
              <Pressable onPress={toggleExpand}>
                <Text className="text-neutral-500"> Show more</Text>
              </Pressable>
            </>
          ) : (
            post.content
          )}
        </Text>
        {post?.postimage && (
          <View className="mt-6 rounded-xl overflow-hidden aspect-[4/3] border border-neutral-100  w-full">
            <Image
              source={{ uri: post?.postimage }}
              className="w-full h-full"
            />
          </View>
        )}

        <Text className="text-sm text-neutral-500 text-right mt-2">
          {getLongTimeStamp(post?.created_at)}
        </Text>
      </View>
    </View>
  );
}
