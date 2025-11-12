import ProfileHeaderSkeleton from "@/src/components/skeletons/ProfileDetailsSkeleton";
import { signOutAction } from "@/src/lib/actions/auth-action";
import { updateAvatarAction } from "@/src/lib/actions/user-action";
import { getSession } from "@/src/utils/user-session";
import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProfileDetails() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(
    null
  );
  const [imageMimeType, setImageMimeType] = useState<string | null | undefined>(
    null
  );

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result?.assets?.at(0)?.base64);
      setImageMimeType(result?.assets?.at(0)?.mimeType);
    }
  }

  if (isLoading) {
    return (
      <View className="mt-3 pb-32">
        {Array.from({ length: 6 })?.map((_, idx) => (
          <ProfileHeaderSkeleton key={idx} />
        ))}
      </View>
    );
  }

  if (error) {
    return <Text>{error?.message}</Text>;
  }

  async function onUpdateAvatar() {
    setIsUpdatingAvatar(true);

    const res = await updateAvatarAction(imageBase64, imageMimeType);

    if (res?.error) {
      Toast.show({
        type: "error",
        text1: res?.error,
      });
    }
    if (res?.success) {
      Toast.show({
        type: "success",
        text1: res?.success,
      });

      setImage("");
    }
    setIsUpdatingAvatar(false);
  }

  async function onSignOut() {
    const res = await signOutAction();

    if (res?.error) {
      Toast.show({
        type: "error",
        text1: res?.error,
      });
    }
  }

  return (
    <View
      className="items-center gap-4 border-b  border-neutral-200 pt-8 pb-8 px-6"
      style={{ boxShadow: "2px 2px 12px #e7e6e6" }}
    >
      {/* avatar */}
      <View className="size-[100px] border border-neutral-100 rounded-full overflow-hidden">
        {data?.avatar ? (
          <Image source={{ uri: data?.avatar }} className="w-full h-full" />
        ) : (
          <Image
            source={require("../../assets/images/user.png")}
            className="w-full h-full"
          />
        )}
      </View>
      <Pressable
        onPress={pickImage}
        className="border bg-black rounded-full flex border-black size-10 items-center justify-center -mt-10 -mr-14"
      >
        <Plus className="text-white size-5" color="white" />
      </Pressable>

      {image && (
        <Pressable
          onPress={onUpdateAvatar}
          className="bg-blue-100 py-3.5 px-8 rounded-lg "
        >
          <Text className="text-blue-600">
            {isUpdatingAvatar ? "updating..." : "Update Avatar"}
          </Text>
        </Pressable>
      )}

      <View className="text-center items-center gap-2">
        {/* name */}
        <Text className="text-2xl font-bold">{data?.name}</Text>

        <Text className="text-lg text-neutral-600">{data?.email}</Text>
      </View>

      <Pressable
        className="bg-red-100 py-3.5 px-8 rounded-lg "
        onPress={onSignOut}
      >
        <Text className="text-red-600">Sign out</Text>
      </Pressable>
    </View>
  );
}
