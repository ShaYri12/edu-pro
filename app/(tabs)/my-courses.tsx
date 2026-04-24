import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ArrowLeft, Star } from "lucide-react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";

export default function MyCoursesScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"Completed" | "Ongoing">(
    "Completed"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  const completedCourses = [
    {
      id: 1,
      title: "Graphic Design Advanced",
      category: "Graphic Design",
      rating: 4.2,
      duration: "2 Hrs 36 Mins",
      image: require("../../assets/images/graphic-design.jpg"),
    },
    {
      id: 2,
      title: "Advance Diploma in Gra..",
      category: "Graphic Design",
      rating: 4.7,
      duration: "3 Hrs 28 Mins",
      image: require("../../assets/images/graphic-design.jpg"),
    },
    {
      id: 3,
      title: "Setup your Graphic Des..",
      category: "Digital Marketing",
      rating: 4.2,
      duration: "4 Hrs 05 Mins",
      image: require("../../assets/images/seo-marketing.jpeg"),
    },
  ];

  const ongoingCourses = [
    {
      id: 4,
      title: "Intro to UI/UX Design",
      category: "UI/UX Design",
      rating: 4.4,
      duration: "3 Hrs 06 Mins",
      progress: 93,
      total: 125,
      completed: 93,
      image: require("../../assets/images/graphic-design.jpg"),
    },
    {
      id: 5,
      title: "Wordpress website Dev..",
      category: "Web Development",
      rating: 3.9,
      duration: "1 Hrs 58 Mins",
      progress: 39,
      total: 31,
      completed: 12,
      image: require("../../assets/images/web-development.jpg"),
    },
    {
      id: 6,
      title: "3D Blender and UI/UX",
      category: "UI/UX Design",
      rating: 4.6,
      duration: "2 Hrs 46 Mins",
      progress: 57,
      total: 98,
      completed: 56,
      image: require("../../assets/images/3d-design.jpg"),
    },
  ];

  // Filter courses based on search query
  const filterCourses = (courses: any[]) => {
    if (!searchQuery.trim()) return courses;

    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get progress bar color based on completion percentage
  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return "#167F71"; // Green for high progress
    if (progress >= 50) return "#FFB800"; // Yellow for medium progress
    return "#FF6B35"; // Orange for low progress
  };

  const filteredCompletedCourses = filterCourses(completedCourses);
  const filteredOngoingCourses = filterCourses(ongoingCourses);

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1 px-8 py-8"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom + 20, 40),
          }}
        >
          {/* Header */}
          <View className="flex-row items-center mb-[20px]">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <ArrowLeft size={24} color="#0B1354" />
            </TouchableOpacity>
            <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
              My Courses
            </Text>
          </View>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search for ..."
            iconType="search"
            onSearch={(text) => {
              setSearchQuery(text);
            }}
          />

          {/* Tabs */}
          <View className="mt-[24px] flex-row items-center gap-[20px]">
            <TouchableOpacity
              onPress={() => setSelectedTab("Completed")}
              activeOpacity={0.8}
              className={`${selectedTab === "Completed" ? "bg-[#167F71]" : "bg-[#E8F1FF]"} px-6 py-[14px] rounded-[24px] flex-1 text-center`}
            >
              <Text
                className={`${selectedTab === "Completed" ? "text-white" : "text-dark-blue"} font-mulish-extrabold text-center`}
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("Ongoing")}
              activeOpacity={0.8}
              className={`${selectedTab === "Ongoing" ? "bg-[#167F71]" : "bg-[#E8F1FF]"} px-6 py-[14px] rounded-[24px] flex-1 text-center`}
            >
              <Text
                className={`${selectedTab === "Ongoing" ? "text-white" : "text-dark-blue"} font-mulish-extrabold text-center`}
              >
                Ongoing
              </Text>
            </TouchableOpacity>
          </View>

          {/* Course Cards */}
          <View className="mt-6 gap-5">
            {selectedTab === "Completed" ? (
              filteredCompletedCourses.length > 0 ? (
                filteredCompletedCourses.map((course) => (
                  <View key={course.id} className="relative">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="w-full bg-white rounded-2xl"
                      style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
                    >
                      <View className="flex-row h-[120px] overflow-hidden rounded-2xl">
                        {/* Course Image */}
                        <View className="w-[130px] h-full overflow-hidden">
                          <Image
                            source={course.image}
                            style={{ width: "100%", height: "100%" }}
                            resizeMode="cover"
                          />
                        </View>

                        {/* Course Info */}
                        <View className="flex-1 px-[14px] py-[14px] justify-between">
                          <View>
                            <Text className="text-[12px] text-[#FF6B35] font-mulish-extrabold mb-1">
                              {course.category}
                            </Text>
                            <Text
                              className="text-[15px] font-jost-semibold text-dark-blue mb-1 leading-tight"
                              numberOfLines={1}
                            >
                              {course.title}
                            </Text>
                          </View>

                          <View className="w-full">
                            <View className="flex-row items-center mb-2">
                              <Star size={14} color="#FFB800" fill="#FFB800" />
                              <Text className="text-dark-blue text-[12px] ml-1 mr-1 font-mulish-extrabold">
                                {course.rating}
                              </Text>
                              <View className="h-[14px] w-[2px] bg-black mx-2" />
                              <Text
                                numberOfLines={1}
                                className="text-[12px] text-light-gray flex-1"
                              >
                                {course.duration}
                              </Text>
                            </View>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={{ alignSelf: "flex-end" }}
                            >
                              <Text
                                className="text-[#167F71] font-mulish-extrabold text-[12px]"
                                style={{ textDecorationLine: "underline" }}
                              >
                                VIEW CERTIFICATE
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Completion Check - Outside the card */}
                    <View
                      style={{ top: -10 }}
                      className="absolute right-4 w-7 h-7 items-center justify-center z-10"
                    >
                      <CheckmarkIcon width={28} height={28} />
                    </View>
                  </View>
                ))
              ) : (
                <View className="items-center py-12">
                  <Text className="text-[18px] font-jost-semibold text-dark-blue">
                    No completed courses found
                  </Text>
                  <Text className="text-[14px] text-light-gray text-center mt-2">
                    Try searching with different keywords
                  </Text>
                </View>
              )
            ) : filteredOngoingCourses.length > 0 ? (
              filteredOngoingCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  activeOpacity={0.8}
                  className="w-full bg-white rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
                >
                  <View className="flex-row h-[120px]">
                    {/* Course Image */}
                    <View className="w-[130px] h-full overflow-hidden">
                      <Image
                        source={course.image}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </View>

                    {/* Course Info */}
                    <View className="flex-1 px-[14px] py-[14px] justify-between">
                      <View>
                        <Text className="text-[12px] text-[#FF6B35] font-mulish-extrabold mb-1">
                          {course.category}
                        </Text>
                        <Text
                          className="text-[16px] font-jost-semibold text-dark-blue mb-2"
                          numberOfLines={1}
                        >
                          {course.title}
                        </Text>
                      </View>

                      <View>
                        <View className="flex-row items-center mb-2">
                          <Star size={14} color="#FFB800" fill="#FFB800" />
                          <Text className="text-dark-blue text-[12px] ml-1 mr-3 font-mulish-extrabold">
                            {course.rating}
                          </Text>
                          <View className="h-[14px] w-[2px] bg-black mx-2" />
                          <Text className="text-[12px] text-light-gray">
                            {course.duration}
                          </Text>
                        </View>

                        {/* Progress Bar */}
                        <View className="flex-row items-center justify-between mb-2">
                          <View className="flex-1 h-2 bg-[#E5E7EB] rounded-full mr-3">
                            <View
                              className="h-2 rounded-full"
                              style={{
                                width: `${course.progress}%`,
                                backgroundColor: getProgressBarColor(
                                  course.progress
                                ),
                              }}
                            />
                          </View>
                          <Text className="text-dark-blue text-[12px] font-mulish-extrabold">
                            {course.completed}/{course.total}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center py-12">
                <Text className="text-[18px] font-jost-semibold text-dark-blue">
                  No ongoing courses found
                </Text>
                <Text className="text-[14px] text-light-gray text-center mt-2">
                  Try searching with different keywords
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Background extension */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-[#F5F9FF]"
          style={{ height: Math.max(insets.bottom, 20), zIndex: -1 }}
        />
      </SafeAreaView>
    </View>
  );
}
