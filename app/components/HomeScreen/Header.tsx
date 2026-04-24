import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NotificationIcon from "@/components/SVGs/Notification";

interface HeaderProps {
  userName: string;
  onBellPress?: () => void;
}

export default function Header({ userName, onBellPress }: HeaderProps) {
  return (
    <View className="pb-6">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[24px] font-jost-semibold text-dark-blue">
            Hi, {userName}
          </Text>
          <Text className="text-[13px] text-[#545454CC] mt-1">
            What would you like to learn Today?
          </Text>
          <Text className="text-[13px] text-[#545454CC]">Search Below.</Text>
        </View>
        <TouchableOpacity
          onPress={onBellPress}
          className="w-10 h-10 rounded-full border-2 border-[#167F71] items-center justify-center"
        >
          <NotificationIcon color="#167F71" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
