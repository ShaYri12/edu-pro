import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

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
    >
      <ImageBackground
        source={require("@/assets/images/promo-card-bg.png")}
        resizeMode="cover"
        imageStyle={{ borderRadius: 22 }}
        className="my-[30px] px-6 py-[30px] overflow-hidden rounded-[22px] h-[180px]"
      >
        <Text className="text-[15px] font-mulish-extrabold text-white relative">
          {discount}
        </Text>
        <Text className="text-[22px] font-mulish-extrabold text-white relative">
          {title}
        </Text>
        <Text className="max-w-[181px] text-[13px] font-mulish-extrabold text-white mt-[10px] relative">
          {description}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
