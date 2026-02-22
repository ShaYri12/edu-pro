import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface PromoCardProps {
  discount: string;
  title: string;
  description: string;
  onPress?: () => void;
}

export default function PromoCard({
  discount,
  title,
  description,
  onPress,
}: PromoCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="my-4 bg-primary rounded-3xl p-6 overflow-hidden"
    >
      <View className="absolute inset-0 opacity-5">
        <View className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white" />
        <View className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-white opacity-10" />
      </View>
      <Text className="text-sm font-semibold text-white opacity-95 relative">
        {discount}
      </Text>
      <Text className="text-2xl font-bold text-white mt-2 relative">
        {title}
      </Text>
      <Text className="text-sm text-white opacity-90 mt-2 leading-5 relative">
        {description}
      </Text>
      <View className="mt-5 flex-row gap-1 relative">
        <View className="w-2.5 h-2.5 rounded-full bg-warning" />
      </View>
    </TouchableOpacity>
  );
}
