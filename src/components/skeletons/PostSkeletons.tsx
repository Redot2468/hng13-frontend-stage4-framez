import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

const Spacer = ({ height = 12 }) => <MotiView style={{ height }} />;

export default function PostSkeleton() {
  return (
    <View className="border-b flex-row gap-3 py-3 border-neutral-200">
      {/* 1. Avatar Skeleton */}
      <Skeleton
        show={true}
        radius="round"
        height={44}
        width={44}
        colorMode="light"
      />

      <View className="flex-1 mt-0.5">
        {/* 2. Name and Timestamp Row */}
        <View className="flex items-center justify-between flex-row">
          <Skeleton show={true} colorMode="light" width={"50%"} height={20} />
          <Skeleton show={true} colorMode="light" width={"25%"} height={16} />
        </View>

        <Spacer height={16} />

        {/* 3. Content Text Skeleton */}
        <Skeleton show={true} colorMode="light" width={"100%"} height={16} />
        <Spacer height={8} />
        <Skeleton show={true} colorMode="light" width={"80%"} height={16} />

        {/* --- START OF FIX --- */}
        {/* 4. Post Image Skeleton */}
        {/* We mimic the PostCard's View with 'aspect-[4/3]' etc. */}
        <View className="mt-6 rounded-xl overflow-hidden aspect-[4/3] w-full">
          {/* The Skeleton fills this container */}
          <Skeleton
            show={true}
            colorMode="light"
            width={"100%"}
            height={"100%"}
          />
        </View>
        {/* --- END OF FIX --- */}

        <Spacer height={12} />

        {/* 5. Long Timestamp Skeleton */}
        <View className="items-end">
          <Skeleton show={true} colorMode="light" width={"40%"} height={14} />
        </View>
      </View>
    </View>
  );
}
