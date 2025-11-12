import { MotiView } from "moti"; // Good for creating controlled spaces
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

// A simple spacer component for convenience
const Spacer = ({ height = 12 }) => <MotiView style={{ height }} />;

export default function ProfileHeaderSkeleton() {
  return (
    <View
      className="items-center gap-4 border-b border-neutral-200 pt-8 pb-8 px-6"
      style={{ boxShadow: "2px 2px 12px #e7e6e6" }}
    >
      {/* 1. Avatar Skeleton (Mimics size-[100px] rounded-full) */}
      <Skeleton
        show={true}
        colorMode="light"
        radius="round"
        width={100}
        height={100}
      />

      {/* 2. Skip the 'Plus' button for the skeleton, it's UI. 
             If you wanted to show a placeholder for the button,
             you could add a small square skeleton here.
      */}
      {/* <Spacer height={20} /> If you needed a gap after the avatar */}

      {/* 3. Placeholder for the "Update Avatar" button (only visible if image exists) */}
      {/* We will show it just as a loading state indicator here */}
      <Skeleton
        show={true}
        colorMode="light"
        width={120}
        height={45}
        radius={8}
      />

      <Spacer height={10} />

      <View className="text-center items-center gap-2">
        {/* 4. Name Skeleton (Mimics text-2xl font-bold) */}
        <Skeleton show={true} colorMode="light" width={150} height={28} />

        <Spacer height={8} />

        {/* 5. Email Skeleton (Mimics text-lg text-neutral-600) */}
        <Skeleton show={true} colorMode="light" width={200} height={24} />
      </View>

      <Spacer height={20} />

      {/* 6. Sign out button Skeleton */}
      <Skeleton
        show={true}
        colorMode="light"
        width={120}
        height={45}
        radius={8}
      />
    </View>
  );
}
