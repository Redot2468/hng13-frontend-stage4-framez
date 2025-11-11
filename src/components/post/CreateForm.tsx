import { createPostAction } from "@/src/lib/actions/post-action";
import { PostSchema, PostSchemaType } from "@/src/lib/schema/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ImageIcon, X } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function CreateForm() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(
    null
  );
  const [imageMimeType, setImageMimeType] = useState<string | null | undefined>(
    null
  );
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { handleSubmit, register, watch, setValue, formState, reset, control } =
    useForm<PostSchemaType>({
      resolver: zodResolver(PostSchema),
    });

  const { content } = formState?.errors;
  const areAllInputsField = !!watch()?.content;

  async function onSubmit(formData: PostSchemaType) {
    setIsCreatingPost(true);
    const res = await createPostAction(formData, imageBase64, imageMimeType);

    if (res?.success) {
      Toast.show({
        type: "success",
        text1: res?.success,
      });

      reset();
      router.push("/(tabs)");
      setImage(null);
      setImageBase64(null);
    }
    if (res?.error) {
      Toast.show({
        type: "error",
        text1: "Post creation failed",
        text2: res?.success,
      });
    }

    setIsCreatingPost(false);
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    // console.log("result:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result?.assets?.at(0)?.base64);
      setImageMimeType(result?.assets?.at(0)?.mimeType);
    }
  }

  const removeImage = () => setImage(null);

  return (
    <ScrollView className="flex-1 px-4 pt-8" contentContainerClassName="pb-32">
      <Text className="text-2xl font-extrabold uppercase">Create post</Text>
      <View className="mt-8" style={{ marginBottom: 20 }}>
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="What's on your mind?"
              editable={!isCreatingPost}
              multiline
              maxLength={2000}
              style={{
                borderWidth: 1,
                borderColor: content ? "#E1306C" : "#DDD",
                padding: 12,
                borderRadius: 8,
                minHeight: 120,
                textAlignVertical: "top",
              }}
            />
          )}
        />
        <View className="flex-row justify-between items-center">
          <Text
            style={{
              color: "#999",
              fontSize: 12,
              marginBottom: 20,
              marginTop: 5,
            }}
          >
            {watch()?.content?.length}/2000
          </Text>

          {content?.message && (
            <Text
              style={{ color: "#E1306C", marginTop: 5 }}
              className="text-sm"
            >
              {content.message}
            </Text>
          )}
        </View>
      </View>

      {image && (
        <View style={{ marginBottom: 20 }}>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 12,
              backgroundColor: "#F0F0F0",
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={removeImage}
            disabled={isCreatingPost}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 20,
              padding: 8,
            }}
          >
            <X size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={pickImage}
        disabled={isCreatingPost}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#F5F5F5",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <ImageIcon size={24} color="#262626" />
        <Text style={{ marginLeft: 10 }}>Add Photo</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isCreatingPost}
        className="disabled:opacity-80"
        style={{
          backgroundColor: "#000000",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
          {isCreatingPost ? "Creating posting..." : "Create post"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// add a "create post" heading
// continue building the form
// add an avatar to the signup
