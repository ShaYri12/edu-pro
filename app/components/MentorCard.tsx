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
      className="mr-4 items-center"
    >
      <View className="w-20 h-20 bg-black rounded-2xl overflow-hidden">
        {image && <Image source={{ uri: image }} className="w-full h-full" />}
      </View>
      <Text className="text-xs text-text font-medium mt-2.5">{name}</Text>
    </TouchableOpacity>
  );
}
