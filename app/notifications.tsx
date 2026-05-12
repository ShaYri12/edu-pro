import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

// Import SVG icons
import SquaresIcon from "@/assets/icons/squares.svg";
import TicketIcon from "@/assets/icons/ticket.svg";
import TransactionIcon from "@/components/SVGs/Transaction";
import ProfileIcon from "@/components/SVGs/Profile";
import CoursesIcon from "@/components/SVGs/Courses";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  time: string;
}

const NotificationIcon = ({ children }: { children: React.ReactNode }) => (
  <View className="w-[52px] h-[52px] rounded-full bg-[#F5F9FF] items-center justify-center mr-2 shadow-[1px_3px_8px_0px_#0000001A]">
    {children}
  </View>
);

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [textLayouts, setTextLayouts] = useState<
    Record<string, { isTruncated: boolean }>
  >({});

  const todayNotifications: NotificationItem[] = [
    {
      id: "1",
      title: "New Category Course.!",
      description: "New the 3D Design Course is Available",
      icon: <CoursesIcon size={20} />,
      time: "today",
    },
    {
      id: "2",
      title: "New Category Course.!",
      description: "New the 3D Design Course is Available",
      icon: <CoursesIcon size={20} />,
      time: "today",
    },
    {
      id: "3",
      title: "Today's Special Offers",
      description: "You Have made a Coure Payment.",
      icon: <TicketIcon width={20} height={20} />,
      time: "today",
    },
  ];

  const yesterdayNotifications: NotificationItem[] = [
    {
      id: "4",
      title: "Credit Card Connected.!",
      description: "Credit Card has been Linked.!",
      icon: <TransactionIcon size={20} />,
      time: "yesterday",
    },
  ];

  const olderNotifications: NotificationItem[] = [
    {
      id: "5",
      title: "Account Setup Successful.!",
      description: "Your Account has been Created.",
      icon: <ProfileIcon size={20} />,
      time: "Nov 20, 2022",
    },
  ];

  const toggleExpanded = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  const handleTextLayout = (itemId: string, event: any) => {
    const { lines } = event.nativeEvent;
    const isTruncated =
      lines.length > 1 ||
      (lines.length === 1 && lines[0].text !== lines[0].text.trim());
    setTextLayouts((prev) => ({
      ...prev,
      [itemId]: { isTruncated },
    }));
  };

  const renderNotificationItem = (item: NotificationItem) => {
    const isExpanded = expandedItems.has(item.id);
    const canExpand = textLayouts[item.id]?.isTruncated;

    return (
      <TouchableOpacity
        key={item.id}
        className="bg-[#E8F1FF] border-2 border-[#B4BDC433] rounded-[18px] px-[18px] py-6 flex-row items-center"
        activeOpacity={0.7}
        onPress={() => canExpand && toggleExpanded(item.id)}
      >
        <NotificationIcon>{item.icon}</NotificationIcon>
        <View className="flex-1">
          <Text className="text-[19px] font-jost-semibold text-dark-blue mb-1">
            {item.title}
          </Text>
          <Text
            numberOfLines={isExpanded ? undefined : 1}
            className="text-[14px] text-[#545454] font-mulish-bold"
            onTextLayout={(event) => handleTextLayout(item.id, event)}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom + 20, 40),
            paddingTop: 24,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center mb-[30px]">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <ArrowLeft size={24} color="#0B1354" />
            </TouchableOpacity>
            <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
              Notifications
            </Text>
          </View>

          {/* Today Section */}
          <View className="mt-6">
            <Text className="text-[16px] font-jost-bold text-dark-blue mb-4">
              Today
            </Text>
            <View className="gap-3">
              {todayNotifications.map(renderNotificationItem)}
            </View>
          </View>

          {/* Yesterday Section */}
          <View className="mt-6">
            <Text className="text-[16px] font-jost-bold text-dark-blue mb-4">
              Yesterday
            </Text>
            <View className="gap-3">
              {yesterdayNotifications.map(renderNotificationItem)}
            </View>
          </View>

          {/* Older Section */}
          <View className="mt-6 mb-6">
            <Text className="text-[16px] font-jost-bold text-dark-blue mb-4">
              Nov 20, 2022
            </Text>
            <View className="gap-3">
              {olderNotifications.map(renderNotificationItem)}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
