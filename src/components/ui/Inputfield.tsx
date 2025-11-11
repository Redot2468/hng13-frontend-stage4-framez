import { SignupSchemaType } from "@/src/lib/schema/auth-schema";
import { Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";

export interface InputfieldType {
  control: Control<SignupSchemaType>;
  name: keyof SignupSchemaType;
  placeholder: string;
  error: string | undefined;
  disabled: boolean;
  style?: StyleProp<TextStyle>;
}

export default function InputField({
  control,
  placeholder,
  name,
  error,
  disabled,
  style,
}: InputfieldType) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full gap-2">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) =>
          name === "password" ? (
            <View className=" rounded-md px-4  gap-2 border border-neutral-400 flex-row justify-between items-center">
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={showPassword ? false : true}
                className="border-none flex-1"
                editable={!disabled}
              />

              <Pressable onPress={() => setShowPassword((cur) => !cur)}>
                {showPassword ? (
                  <EyeClosed color="gray" size={20} />
                ) : (
                  <Eye color="gray" size={20} />
                )}
              </Pressable>
            </View>
          ) : (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              className="form-input"
              editable={!disabled}
              style={style}
            />
          )
        }
      />

      {error && (
        <Text className="text-sm text-red-600 font-medium text-right">
          {error}
        </Text>
      )}
    </View>
  );
}
