import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Star } from "lucide-react-native";
import BookmarkIcon from "@/assets/icons/bookmark-minus.svg";
import BookmarkCheckedIcon from "@/assets/icons/bookmark-minus-checked.svg";

interface CourseCardProps {
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image?: ImageSourcePropType;
  students?: string;
  onPress?: () => void;
  onBookmark?: () => void;
  variant?: "grid" | "list";
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
  variant = "grid",
  bookmarked = false,
}: CourseCardProps) {
  if (variant === "list") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="w-full bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
      >
        <View className="flex-row h-[120px]">
          <View className="w-[130px] h-full bg-black overflow-hidden">
            {image && (
              <Image
                source={image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            )}
          </View>

          <View className="flex-1 px-[14px] py-[14px] justify-between">
            <View>
              <View className="flex-row items-center justify-between gap-2 mb-[6px]">
                <Text
                  className="text-xs text-destructive flex-1"
                  numberOfLines={1}
                >
                  {category}
                </Text>
                <TouchableOpacity onPress={onBookmark} activeOpacity={0.6}>
                  {bookmarked ? (
                    <BookmarkCheckedIcon width={14.4} height={18} />
                  ) : (
                    <BookmarkIcon width={14.4} height={18} />
                  )}
                </TouchableOpacity>
              </View>

              <Text
                className="text-base font-jost-semibold text-dark-blue mb-1"
                numberOfLines={1}
              >
                {title}
              </Text>

              <Text className="text-[17px] font-mulish-extrabold text-primary mb-[5px]">
                {price}
              </Text>
            </View>

            <View className="flex-row items-center gap-[6px]">
              <View className="flex-row items-center gap-[3px]">
                <Star size={14} color="#FAC025" fill="#FAC025" />
                <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
                  {rating}
                </Text>
              </View>

              <View className="h-[14px] w-[2px] bg-black mx-2" />

              <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
                {students} Std
              </Text>
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
      style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
    >
      <View className="w-full h-[134px] bg-black rounded-t-xl overflow-hidden">
        {image && (
          <Image
            source={image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}
      </View>

      <View className="px-[14px] pt-[10px] pb-[21px] min-h-[100px] justify-between">
        <View>
          <View className="flex-row items-center justify-between gap-2 mb-[7px]">
            <Text className="text-xs text-destructive flex-1" numberOfLines={1}>
              {category}
            </Text>
            <TouchableOpacity onPress={onBookmark} activeOpacity={0.6}>
              {bookmarked ? (
                <BookmarkCheckedIcon width={14.4} height={18} />
              ) : (
                <BookmarkIcon width={14.4} height={18} />
              )}
            </TouchableOpacity>
          </View>
          <Text
            className="text-base font-jost-semibold text-dark-blue mb-[10px]"
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>

        <View className="flex-row items-center gap-[6px] flex-wrap">
          <Text className="text-[15px] font-mulish-extrabold text-primary">
            {price}
          </Text>
          <View className="h-[14px] w-[2px] bg-black" />
          <View className="flex-row items-center gap-[3px]">
            <Star size={14} color="#FAC025" fill="#FAC025" />
            <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
              {rating}
            </Text>
          </View>
          <View className="h-[14px] w-[2px] bg-black" />
          <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
            {students} Std
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
