import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Star,
  Heart,
  ArrowRight,
} from "lucide-react-native";
import { getCourseById } from "@/constants/courses";

export default function ReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const course = getCourseById(id || "");
  const [reviewFilter, setReviewFilter] = useState<
    "All" | "Excellent" | "Good" | "Average" | "Below Average"
  >("All");
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const insets = useSafeAreaInsets();

  // Helper function to toggle like status
  const toggleLike = (reviewId: string) => {
    setLikedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  // Helper function to filter reviews based on rating
  const getFilteredReviews = () => {
    if (!course) return [];

    switch (reviewFilter) {
      case "Excellent":
        return course.reviewsList.filter((r) => r.rating >= 4.5);
      case "Good":
        return course.reviewsList.filter(
          (r) => r.rating >= 3.5 && r.rating < 4.5
        );
      case "Average":
        return course.reviewsList.filter(
          (r) => r.rating >= 2.5 && r.rating < 3.5
        );
      case "Below Average":
        return course.reviewsList.filter((r) => r.rating < 2.5);
      default:
        return course.reviewsList;
    }
  };

  if (!course) {
    return (
      <View className="flex-1 bg-[#F5F9FF]">
        <SafeAreaView className="flex-1" edges={["top"]}>
          <View className="p-6">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="mb-4"
            >
              <ArrowLeft size={24} color="#0B1354" />
            </TouchableOpacity>
            <Text className="text-dark-blue font-jost-semibold text-[18px]">
              Course not found
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const filteredReviews = getFilteredReviews();

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center gap-2.5 px-6 pt-6 bg-white">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#0B1354" />
          </TouchableOpacity>
          <Text className="text-[18px] font-jost-semibold text-dark-blue">
            Reviews
          </Text>
        </View>

        {/* Rating Summary */}
        <View className="bg-white px-6 pb-5 items-center">
          <Text className="text-[38px] font-jost-semibold text-dark-blue">
            {course.rating.toFixed(1)}
          </Text>
          <View className="flex-row items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                color="#FAC025"
                fill={
                  star <= Math.floor(course.rating)
                    ? "#FAC025"
                    : "transparent"
                }
              />
            ))}
          </View>
          <Text className="text-[13px] text-[#545454] mt-1">
            Based on {filteredReviews.length}{" "}
            {reviewFilter === "All" ? "" : reviewFilter} Reviews
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="bg-white px-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2.5">
              {["All", "Excellent", "Good", "Average", "Below Average"].map(
                (filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setReviewFilter(filter as any)}
                    activeOpacity={0.7}
                    className={`px-[18px] py-1.5 rounded-full ${
                      reviewFilter === filter
                        ? "bg-[#167F71]"
                        : "bg-[#E8F1FF]"
                    }`}
                  >
                    <Text
                      className={`text-[13px] ${
                        reviewFilter === filter
                          ? "text-white"
                          : "text-dark-blue"
                      }`}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
        </View>

        {/* Reviews List */}
        <ScrollView
          className="flex-1 px-6 py-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingBottom: Math.max(insets.bottom + 100, 120) 
          }}
        >
          <View className="gap-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((r) => (
                <View
                  key={r.id}
                  className="bg-white rounded-2xl p-4"
                  style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="w-[44px] h-[44px] rounded-full bg-black" />
                      <View className="flex-1">
                        <Text className="text-[16px] font-jost-semibold text-dark-blue">
                          {r.user}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-[2px] border-2 border-primary px-3 py-[5px] rounded-full bg-[#E8F1FF]">
                      <Star size={12} color="#FAC025" fill="#FAC025" />
                      <Text className="text-[13px] text-dark-blue font-jost-semibold">
                        {r.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-[13px] text-[#545454] mb-4">
                    {r.text}
                  </Text>

                  <View className="flex-row items-center gap-6">
                    <TouchableOpacity
                      onPress={() => toggleLike(r.id)}
                      activeOpacity={0.7}
                      className="flex-row items-center gap-2"
                    >
                      <Heart
                        size={16}
                        fill={
                          likedReviews.has(r.id) ? "#DD2E44" : "transparent"
                        }
                        color="#DD2E44"
                      />
                      <Text className="text-[12px] font-extrabold text-dark-blue">
                        {r.likes}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-[12px] font-extrabold text-dark-blue">
                      {r.timeAgo}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="items-center py-12">
                <Text className="text-[16px] text-[#6B7280] text-center">
                  No reviews found for "{reviewFilter}" filter
                </Text>
                <TouchableOpacity
                  onPress={() => setReviewFilter("All")}
                  activeOpacity={0.7}
                  className="mt-4 bg-primary px-6 py-2 rounded-full"
                >
                  <Text className="text-white font-jost-semibold">
                    Show All Reviews
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Write Review Button */}
        <View
          className="absolute left-6 right-6"
          style={{ bottom: Math.max(insets.bottom + 20, 20) }}
        >
          <TouchableOpacity className="flex-row items-center justify-between bg-primary rounded-full py-2.5 ps-6 pe-2.5">
            <Text className="text-[17px] text-white font-jost-semibold">
              Write a Review
            </Text>

            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
              <ArrowRight size={18} color="#0961F5" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}