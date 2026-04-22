import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star, Bookmark, Heart } from "lucide-react-native";
import { getMentorById, getCoursesByMentorId } from "@/constants/courses";
import { useAppStateBackground } from "./hooks/useAppStateBackground";

// Dummy ratings data
const mentorRatings = [
  {
    id: "mr-1",
    user: "Sarah Johnson",
    rating: 5.0,
    text: "Excellent mentor! Very knowledgeable and patient. Helped me understand complex design concepts easily.",
    timeAgo: "2 days ago",
    course: "Graphic Design Advanced",
  },
  {
    id: "mr-2",
    user: "Mike Chen",
    rating: 4.8,
    text: "Great teaching style and very responsive to questions. The feedback on assignments was detailed and helpful.",
    timeAgo: "1 week ago",
    course: "Typography Masterclass",
  },
  {
    id: "mr-3",
    user: "Emily Rodriguez",
    rating: 4.9,
    text: "Amazing mentor with real industry experience. The practical tips and insights were invaluable.",
    timeAgo: "2 weeks ago",
    course: "Brand Identity Design",
  },
  {
    id: "mr-4",
    user: "David Kim",
    rating: 4.7,
    text: "Very professional and organized. The course structure was perfect and easy to follow.",
    timeAgo: "3 weeks ago",
    course: "Graphic Design Advanced",
  },
  {
    id: "mr-5",
    user: "Lisa Wang",
    rating: 4.6,
    text: "Learned so much from this mentor. The portfolio review sessions were particularly helpful.",
    timeAgo: "1 month ago",
    course: "Design Portfolio Building",
  },
];

export default function MentorDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const mentor = useMemo(() => getMentorById(id || ""), [id]);

  const mentorCourses = useMemo(
    () => getCoursesByMentorId(parseInt(id || "0")),
    [id]
  );
  const [activeTab, setActiveTab] = useState<"Courses" | "Ratings">("Courses");
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const insets = useSafeAreaInsets();
  const backgroundKey = useAppStateBackground();

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

  if (!mentor) {
    return (
      <View className="flex-1 bg-[#F5F9FF]">
        <SafeAreaView className="flex-1" edges={["top"]}>
          <View
            className="p-6"
            style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="mb-4"
            >
              <ArrowLeft size={24} color="#0B1354" />
            </TouchableOpacity>
            <Text className="text-dark-blue font-jost-semibold text-[18px]">
              Mentor not found
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F5F9FF]" key={backgroundKey}>
      <View className="flex-1 bg-[#F5F9FF]">
        <SafeAreaView className="flex-1" edges={["top"]}>
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: Math.max(insets.bottom + 20, 40),
            }}
          >
            <View className="p-6 bg-white shadow-[2px_5px_30px_0px_#00000014]">
              {/* Header */}
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <ArrowLeft size={24} color="#0B1354" />
              </TouchableOpacity>

              {/* Profile Section */}
              <View className="items-center mt-5.5">
                {/* Avatar */}
                <View className="w-[120px] h-[120px] rounded-full bg-black overflow-hidden">
                  {mentor.avatar && (
                    <Image
                      source={mentor.avatar}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                </View>

                {/* Name and Title */}
                <View className="items-center mt-2">
                  <Text className="text-[21px] font-jost-semibold text-dark-blue">
                    {mentor.name}
                  </Text>
                  <Text className="text-[13px] text-[#545454]">
                    {mentor.category}
                    {mentor.company && ` At ${mentor.company}`}
                  </Text>
                </View>

                {/* Stats */}
                <View className="flex-row items-center justify-between w-full mt-2.5">
                  <View className="items-center flex-1">
                    <Text className="text-[17px] font-jost-semibold text-dark-blue">
                      {mentor.totalCourses}
                    </Text>
                    <Text className="text-[13px] text-[#6B7280]">Courses</Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text className="text-[17px] font-jost-semibold text-dark-blue">
                      {mentor.totalStudents.toLocaleString()}
                    </Text>
                    <Text className="text-[13px] text-[#6B7280]">Students</Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text className="text-[17px] font-jost-semibold text-dark-blue">
                      {mentor.totalRatings}
                    </Text>
                    <Text className="text-[13px] text-[#6B7280]">Ratings</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-4 w-full mt-5">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-1 bg-[#E8F1FF] border border-[#B4BDC466] rounded-full py-4 items-center"
                  >
                    <Text className="text-dark-blue font-jost-semibold text-[16px]">
                      Follow
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-1 bg-primary rounded-full py-4 items-center"
                  >
                    <Text className="text-white font-jost-semibold text-[16px]">
                      Message
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="px-6 pt-3 pb-6">
              <View className="bg-white rounded-2xl shadow-[0_4px_10px_0_#00000014]">
                {/* Bio Section */}
                <View className="p-5">
                  <Text className="text-[13px] text-light-gray text-center">
                    "{mentor.bio}"
                  </Text>
                </View>

                {/* Tabs */}
                <View>
                  {/* Tab Headers */}
                  <View className="flex-row items-stretch overflow-hidden">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setActiveTab("Courses")}
                      className={`flex-1 items-center p-4 border-2 ${
                        activeTab === "Courses"
                          ? "bg-[#F5F9FF] border-[#E8F1FF]"
                          : "bg-[#E8F1FF] border-[#E8F1FF]"
                      }`}
                    >
                      <Text
                        className={`font-jost-semibold ${
                          activeTab === "Courses"
                            ? "text-dark-blue"
                            : "text-dark-blue"
                        }`}
                      >
                        Courses
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setActiveTab("Ratings")}
                      className={`flex-1 items-center p-4 border-2 ${
                        activeTab === "Ratings"
                          ? "bg-[#F5F9FF] border-[#E8F1FF]"
                          : "bg-[#E8F1FF] border-[#E8F1FF]"
                      }`}
                    >
                      <Text
                        className={`font-jost-semibold ${
                          activeTab === "Ratings"
                            ? "text-dark-blue"
                            : "text-dark-blue"
                        }`}
                      >
                        Ratings
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Tab Content */}
                  <View className="p-4">
                    {activeTab === "Courses" ? (
                      <View className="gap-4">
                        {mentorCourses.length > 0 ? (
                          mentorCourses.map((course) => (
                            <TouchableOpacity
                              key={course.id}
                              activeOpacity={0.8}
                              className="flex-row items-center gap-3 last:pb-0 pb-2.5 border-b border-[#B4BDC4] last:border-b-0"
                              onPress={() =>
                                router.push(`/course?id=${course.id}`)
                              }
                            >
                              {/* Course Image */}
                              <View className="w-[130px] h-[130px] rounded-2xl bg-black overflow-hidden">
                                {course.image && (
                                  <Image
                                    source={course.image}
                                    style={{ width: "100%", height: "100%" }}
                                    resizeMode="cover"
                                  />
                                )}
                              </View>

                              {/* Course Info */}
                              <View className="flex-1">
                                <View className="flex-row items-center justify-between gap-2">
                                  <Text className="text-xs text-destructive">
                                    {course.category}
                                  </Text>
                                  <View className="w-6 h-6 items-center justify-center">
                                    <Bookmark size={16} color="#0FB77A" />
                                  </View>
                                </View>

                                <Text className="text-base font-jost-semibold text-dark-blue mt-1 line-clamp-1">
                                  {course.title}
                                </Text>

                                <Text className="text-[17px] font-mulish-extrabold text-primary mt-1">
                                  {course.price}/-
                                </Text>

                                <View className="flex-row items-center gap-[6px] mt-1">
                                  <View className="flex-row items-center gap-[3px]">
                                    <Star
                                      size={14}
                                      color="#FAC025"
                                      fill="#FAC025"
                                    />
                                    <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
                                      {course.rating.toFixed(1)}
                                    </Text>
                                  </View>
                                  <View className="h-[14px] w-[2px] bg-black mx-2" />
                                  <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
                                    {course.students} Std
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <Text className="text-center text-[#6B7280] py-8">
                            No courses available
                          </Text>
                        )}
                      </View>
                    ) : (
                      <View className="gap-4">
                        {mentorRatings.map((rating) => (
                          <View
                            key={rating.id}
                            className="bg-white rounded-2xl p-4"
                            style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
                          >
                            <View className="flex-row items-start justify-between">
                              <View className="flex-row items-center flex-1 gap-3">
                                <View className="w-[36px] h-[36px] rounded-full bg-black" />
                                <View className="flex-row items-center justify-between flex-1 gap-3">
                                  <Text className="text-[14px] font-jost-semibold text-dark-blue">
                                    {rating.user}
                                  </Text>
                                  <View className="flex-row items-center gap-[2px] border border-primary px-3 py-[5px] rounded-full bg-[#E8F1FF]">
                                    <Star
                                      size={12}
                                      color="#FAC025"
                                      fill="#FAC025"
                                    />
                                    <Text className="text-[13px] text-dark-blue font-jost-semibold">
                                      {rating.rating.toFixed(1)}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <Text className="text-[13px] font-mulish-bold text-[#545454] mt-2 mb-3">
                              {rating.text}
                            </Text>
                            <View className="flex-row items-center gap-5">
                              <TouchableOpacity
                                onPress={() => toggleLike(rating.id)}
                                activeOpacity={0.7}
                                className="flex-row items-center gap-2"
                              >
                                <Heart
                                  size={16}
                                  fill={
                                    likedReviews.has(rating.id)
                                      ? "#DD2E44"
                                      : "transparent"
                                  }
                                  color="#DD2E44"
                                />
                                <Text className="text-[12px] font-extrabold text-dark-blue">
                                  {Math.floor(Math.random() * 500) + 100}
                                </Text>
                              </TouchableOpacity>
                              <Text className="text-[12px] font-extrabold text-dark-blue">
                                {rating.timeAgo}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Background extension to ensure system navigation area is covered */}
          <View
            className="absolute bottom-0 left-0 right-0 bg-[#F5F9FF]"
            style={{ height: Math.max(insets.bottom, 20), zIndex: -1 }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
