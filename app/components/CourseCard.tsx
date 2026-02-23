import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Star, Bookmark } from 'lucide-react-native';

interface CourseCardProps {
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image?: string;
  onPress?: () => void;
  onBookmark?: () => void;
}

export default function CourseCard({
  title,
  category,
  rating,
  reviews,
  price,
  image,
  onPress,
  onBookmark,
}: CourseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-[260px] bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
    >
      <View className="w-full h-32 bg-black rounded-t-xl">
        {image && <Image source={{ uri: image }} className="w-full h-full" />}
      </View>

      <View className="p-3">
        <Text className="text-xs text-warning font-bold">{category}</Text>
        <Text className="text-sm font-bold text-dark-blue mt-1.5 mb-2 line-clamp-2">{title}</Text>

        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-1">
            <Star size={14} color="#FF9500" fill="#FF9500" />
            <Text className="text-xs text-[#545454CC] font-medium">
              {rating} ({reviews})
            </Text>
          </View>
          <TouchableOpacity onPress={onBookmark} activeOpacity={0.6}>
            <Bookmark size={16} color="#D0D0D0" />
          </TouchableOpacity>
        </View>

        <Text className="text-sm font-bold text-dark-blue">{price}</Text>
      </View>
    </TouchableOpacity>
  );
}
