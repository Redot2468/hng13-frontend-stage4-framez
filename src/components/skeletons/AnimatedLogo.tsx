import { MotiImage } from "moti";
import { View } from "react-native";

const AnimatedLogo = () => {
  return (
    <MotiImage
      source={require("../../assets/images/logo.png")}
      style={{ width: 120, height: 120 }}
      from={{ scale: 1 }}
      animate={{ scale: 1.15 }}
      resizeMode="contain"
      transition={{
        type: "timing",
        duration: 800,
        loop: true,
        repeatReverse: true,
      }}
    />
  );
};

export default function LoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        backgroundColor: "rgba(255, 255, 255, 0.8)",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedLogo />
    </View>
  );
}
