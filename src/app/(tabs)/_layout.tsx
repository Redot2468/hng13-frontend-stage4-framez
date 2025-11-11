import { Tabs } from "expo-router";
import { BadgePlus, Newspaper, User } from "lucide-react-native";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TABS_CONTENTS = [
  {
    name: "index",
    title: "Feeds",
    icon: Newspaper,
  },

  {
    name: "posts/create/index",
    title: "Create",
    icon: BadgePlus,
  },
  {
    name: "user/index",
    title: "Profile",
    icon: User,
  },
];

export default function TabsLayout() {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,

        headerStyle: {
          backgroundColor: "#ffffff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        },

        tabBarStyle: {
          position: "absolute",
          bottom: 25 + bottom,
          left: 0,
          right: 0,
          overflow: "hidden",
          marginHorizontal: 30,
          backgroundColor: "#FFFFFF",
          borderRadius: 25,
          height: 50,
          paddingBottom: 0,
          paddingTop: 0,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarItemStyle: {
          borderRadius: 15,
          marginHorizontal: 0,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarIconStyle: {
          marginBottom: 0,
          marginTop: 5,
          width: 100,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#262626",
        tabBarActiveBackgroundColor: "#000000",

        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 120, height: 20 }}
            resizeMode="contain"
          />
        ),
      }}
    >
      {TABS_CONTENTS.map((tabContent, idx) => (
        <Tabs.Screen
          key={idx}
          name={tabContent?.name}
          options={{
            title: tabContent?.title,
            tabBarIcon: ({ color, focused }) => (
              <tabContent.icon color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
