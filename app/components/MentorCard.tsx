import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface MentorCardProps {
  name: string;
  image?: string;
  onPress?: () => void;
}

export default function MentorCard({ name, image, onPress }: MentorCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="items-center"
    >
      <View className="w-20 h-[70px] bg-black rounded-[20px] overflow-hidden">
        {image && <Image source={{ uri: image }} className="w-full h-full" />}
      </View>
      <Text className="text-[13px] font-jost-semibold text-dark-blue mt-[7px]">{name}</Text>
    </TouchableOpacity>
  );
}
