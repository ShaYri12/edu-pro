import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/HapticTab";
import { configureSystemUI } from "@/utils/systemUI";

// Import custom SVG icons
import HomeIcon from "@/components/SVGs/Home";
import CoursesIcon from "@/components/SVGs/Courses";
import IndexIcon from "@/components/SVGs/Index";
import TransactionIcon from "@/components/SVGs/Transaction";
import ProfileIcon from "@/components/SVGs/Profile";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#167F71", // Green color for active tab
        tabBarInactiveTintColor: "#202244", // Dark color for inactive tabs
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // White background
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8), // Use safe area bottom or minimum 8px
          paddingLeft: insets.left,
          paddingRight: insets.right,
          height: Math.max(insets.bottom + 60, 68), // Adjust height based on safe area
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "800",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={20} />,
        }}
      />

      <Tabs.Screen
        name="my-courses"
        options={{
          title: "MY COURSES",
          tabBarIcon: ({ color }) => <CoursesIcon color={color} size={20} />,
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          title: "INBOX",
          tabBarIcon: ({ color }) => <IndexIcon color={color} size={20} />,
        }}
      />

      <Tabs.Screen
        name="transaction"
        options={{
          title: "TRANSACTION",
          tabBarIcon: ({ color }) => (
            <TransactionIcon color={color} size={20} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "PROFILE",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}
