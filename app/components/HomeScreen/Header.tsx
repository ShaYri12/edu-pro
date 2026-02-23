import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface HeaderProps {
  userName: string;
  onBellPress?: () => void;
}

export default function Header({ userName, onBellPress }: HeaderProps) {
  return (
    <View className="pb-11">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[24px] font-jost-semibold text-dark-blue">Hi, {userName}</Text>
          <Text className="text-[13px] text-[#545454CC] mt-1">What would you like to learn Today?</Text>
          <Text className="text-[13px] text-[#545454CC]">Search Below.</Text>
        </View>
        <TouchableOpacity 
          onPress={onBellPress}
          className="w-10 h-10 rounded-full border-2 border-[#167F71] items-center justify-center"
        >
          <Image
            source={require("@/assets/icons/notification.svg")}
            className="w-[15.3] h-[18px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
