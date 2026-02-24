import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface MentorCardProps {
  name: string;
  image?: string;
  category?: string;
  onPress?: () => void;
}

export default function MentorCard({ name, image, category, onPress }: MentorCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex items-center ${category ? "gap-[11px] flex-row" : "flex-col gap-[7px]"}`}
    >
      <View className={`bg-black ${category ? "rounded-full w-[66px] h-[66px]" : "rounded-[20px] w-20 h-[70px]"} overflow-hidden`}>
        {image && <Image source={{ uri: image }} className="w-full h-full" />}
      </View>
      <View>
        <Text className="text-[13px] font-jost-semibold text-dark-blue">{name}</Text>
        {category &&
          <Text className="text-[13px] text-[#545454]">
            {category}
          </Text>
        }
      </View>
    </TouchableOpacity>
  );
}
