import React from 'react';
import { Text, TouchableOpacity, ImageBackground, StyleProp, ViewStyle } from 'react-native';

interface PromoCardProps {
  discount: string;
  title: string;
  description: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function PromoCard({
  discount,
  title,
  description,
  onPress,
  containerStyle,
}: PromoCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={containerStyle}
    >
      <ImageBackground
        source={require("@/assets/images/promo-card-bg.png")}
        resizeMode="cover"
        imageStyle={{ borderRadius: 22 }}
        className="my-[30px] px-6 py-[30px] overflow-hidden rounded-[22px] h-[180px] bg-primary"
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
