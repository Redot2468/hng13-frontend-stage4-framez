import React from "react";
import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../../assets/images/logo.png")}
      alt="Framez logo"
      style={{ width: 150, height: 33, resizeMode: "contain" }}
    />
  );
}
