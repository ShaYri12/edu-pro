import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Star } from 'lucide-react-native';

interface CourseCardProps {
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image?: string;
  students?: string;
  onPress?: () => void;
  onBookmark?: () => void;
  variant?: 'grid' | 'list';
  bookmarked?: boolean;
}

export default function CourseCard({
  title,
  category,
  rating,
  reviews,
  price,
  image,
  students,
  onPress,
  onBookmark,
  variant = 'grid',
  bookmarked = false,
}: CourseCardProps) {
  if (variant === 'list') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="w-full bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: '0px 6px 16px 0px #00000012' }}
      >
        <View className="flex-row items-stretch">
          <View className="w-[130px] bg-black">
            {image && <Image source={{ uri: image }} className="w-full h-full" />}
          </View>

          <View className="flex-1 px-[14px] py-[14px]">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-xs text-destructive">{category}</Text>
              <TouchableOpacity onPress={onBookmark} activeOpacity={0.6}>
                <Image
                  source={
                    bookmarked
                      ? require('@/assets/icons/bookmark-minus-checked.svg')
                      : require('@/assets/icons/bookmark-minus.svg')
                  }
                  className="w-[14.4px] h-[18px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <Text className="text-base font-jost-semibold text-dark-blue mt-[6px] mb-[10px] line-clamp-1">
              {title}
            </Text>

            <Text className="text-[17px] font-mulish-extrabold text-primary mb-[8px]">{price}</Text>

            <View className="flex-row items-center gap-[6px]">
              <View className="flex-row items-center gap-[3px]">
                <Star size={14} color="#FAC025" fill="#FAC025" />
                <Text className="text-[11px] font-mulish-extrabold text-dark-blue">{rating}</Text>
              </View>

              <View className="h-[14px] w-[2px] bg-black mx-2" />

              <Text className="text-[11px] font-mulish-extrabold text-dark-blue">{students} Std</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // default grid card
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-[260px] bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: '0px 4px 10px 0px #00000014' }}
    >
      <View className="w-full h-[134px] bg-black rounded-t-xl">
        {image && <Image source={{ uri: image }} className="w-full h-full" />}
      </View>

      <View className="px-[14px] pt-[10px] pb-[21px]">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-xs text-destructive">{category}</Text>
          <TouchableOpacity onPress={onBookmark} activeOpacity={0.6}>
            <Image
              source={
                bookmarked
                  ? require('@/assets/icons/bookmark-minus-checked.svg')
                  : require('@/assets/icons/bookmark-minus.svg')
              }
              className="w-[14.4px] h-[18px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-base font-jost-semibold text-dark-blue mt-[7px] mb-[10px] line-clamp-1">{title}</Text>

        <View className="flex-row items-center gap-[6px]">
          <Text className="text-[15px] font-mulish-extrabold text-primary">{price}</Text>
          <View className="h-[14px] w-[2px] bg-black me-2" />
          <View className="flex-row items-center gap-[3px]">
            <Star size={14} color="#FAC025" fill="#FAC025" />
            <Text className="text-[11px] font-mulish-extrabold text-dark-blue">{rating}</Text>
          </View>
          <View className="h-[14px] w-[2px] bg-black mx-2" />
          <Text className="text-[11px] font-mulish-extrabold text-dark-blue">{students} Std</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
