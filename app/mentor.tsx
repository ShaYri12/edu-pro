import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star, Bookmark } from "lucide-react-native";
import { getMentorById, getCoursesByMentorId } from "@/constants/courses";

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

  if (!mentor) {
    return (
      <View className="flex-1 bg-[#F5F9FF] p-8">
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
    );
  }

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="px-6 pt-12 pb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mb-8"
          >
            <ArrowLeft size={24} color="#0B1354" />
          </TouchableOpacity>

          {/* Profile Section */}
          <View className="items-center">
            {/* Avatar */}
            <View className="w-[120px] h-[120px] rounded-full bg-black overflow-hidden mb-4">
              {mentor.avatar && (
                <Image
                  source={mentor.avatar}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              )}
            </View>

            {/* Name and Title */}
            <View className="items-center mb-6">
              <Text className="text-[24px] font-jost-semibold text-dark-blue mb-1">
                {mentor.name}
              </Text>
              <Text className="text-[16px] text-[#6B7280]">
                {mentor.category}
                {mentor.company && ` At ${mentor.company}`}
              </Text>
            </View>

            {/* Stats */}
            <View className="flex-row items-center justify-between w-full mb-8">
              <View className="items-center flex-1">
                <Text className="text-[28px] font-mulish-extrabold text-dark-blue">
                  {mentor.totalCourses}
                </Text>
                <Text className="text-[14px] text-[#6B7280]">Courses</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-[28px] font-mulish-extrabold text-dark-blue">
                  {mentor.totalStudents.toLocaleString()}
                </Text>
                <Text className="text-[14px] text-[#6B7280]">Students</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-[28px] font-mulish-extrabold text-dark-blue">
                  {mentor.totalRatings}
                </Text>
                <Text className="text-[14px] text-[#6B7280]">Ratings</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-4 w-full mb-8">
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 bg-[#E8F1FF] rounded-full py-4 items-center"
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

        {/* Bio Section */}
        <View className="px-6 mb-6">
          <View
            className="bg-white rounded-2xl p-6"
            style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
          >
            <Text className="text-[14px] text-[#6B7280] text-center leading-6">
              "{mentor.bio}"
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-6">
          <View
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
          >
            {/* Tab Headers */}
            <View className="flex-row">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab("Courses")}
                className={`flex-1 py-4 items-center ${
                  activeTab === "Courses" ? "bg-[#F5F9FF]" : "bg-white"
                }`}
              >
                <Text
                  className={`font-jost-semibold text-[16px] ${
                    activeTab === "Courses"
                      ? "text-dark-blue"
                      : "text-[#6B7280]"
                  }`}
                >
                  Courses
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab("Ratings")}
                className={`flex-1 py-4 items-center ${
                  activeTab === "Ratings" ? "bg-[#F5F9FF]" : "bg-white"
                }`}
              >
                <Text
                  className={`font-jost-semibold text-[16px] ${
                    activeTab === "Ratings"
                      ? "text-dark-blue"
                      : "text-[#6B7280]"
                  }`}
                >
                  Ratings
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View className="p-6">
              {activeTab === "Courses" ? (
                <View className="gap-4">
                  {mentorCourses.length > 0 ? (
                    mentorCourses.map((course) => (
                      <TouchableOpacity
                        key={course.id}
                        activeOpacity={0.8}
                        className="flex-row gap-4"
                        onPress={() => router.push(`/course?id=${course.id}`)}
                      >
                        {/* Course Image */}
                        <View className="w-[100px] h-[100px] rounded-2xl bg-black overflow-hidden">
                          {course.image && (
                            <Image
                              source={course.image}
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                            />
                          )}
                        </View>

                        {/* Course Info */}
                        <View className="flex-1 justify-between">
                          <View>
                            <Text className="text-[12px] text-[#FF6B35] font-mulish-extrabold mb-1">
                              {course.category}
                            </Text>
                            <Text className="text-[16px] font-jost-semibold text-dark-blue mb-2 line-clamp-2">
                              {course.title}
                            </Text>
                            <Text className="text-[16px] font-mulish-extrabold text-primary mb-2">
                              {course.price}/
                              <Text className="text-[#6B7280] text-[14px]">
                                {course.price + 42}
                              </Text>
                            </Text>
                          </View>
                          <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-1">
                              <Star size={14} color="#FAC025" fill="#FAC025" />
                              <Text className="text-[12px] font-mulish-extrabold text-dark-blue">
                                {course.rating.toFixed(1)}
                              </Text>
                              <Text className="text-[12px] text-[#6B7280] ml-2">
                                {course.students} Std
                              </Text>
                            </View>
                            <View className="w-6 h-6 items-center justify-center">
                              <Bookmark size={16} color="#0FB77A" />
                            </View>
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
                      className="border-b border-[#E5E7EB] pb-4 last:border-b-0"
                    >
                      <View className="flex-row items-start justify-between mb-2">
                        <View className="flex-row items-center gap-3">
                          <View className="w-[36px] h-[36px] rounded-full bg-[#6B7280]" />
                          <View>
                            <Text className="text-[14px] font-jost-semibold text-dark-blue">
                              {rating.user}
                            </Text>
                            <View className="flex-row items-center gap-1 mt-1">
                              <Star size={12} color="#FAC025" fill="#FAC025" />
                              <Text className="text-[11px] text-dark-blue font-mulish-extrabold">
                                {rating.rating.toFixed(1)}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Text className="text-[12px] text-[#6B7280]">
                          {rating.timeAgo}
                        </Text>
                      </View>
                      <Text className="text-[13px] text-[#6B7280] mb-2 leading-5">
                        {rating.text}
                      </Text>
                      <Text className="text-[12px] text-primary font-mulish-extrabold">
                        Course: {rating.course}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
