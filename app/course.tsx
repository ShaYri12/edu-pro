import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Star,
  ChevronRight,
  Bookmark,
  Clock,
  BadgeCheck,
  MessageCircle,
  Play,
  X,
  Heart,
} from "lucide-react-native";
import { getCourseById } from "@/constants/courses";

export default function CourseDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const course = useMemo(() => getCourseById(id || ""), [id]);
  const [activeTab, setActiveTab] = useState<"About" | "Curriculum">("About");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!course) {
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
          Course not found
        </Text>
      </View>
    );
  }

  // Helper function to get truncated description with multiple paragraphs
  const getTruncatedDescription = (text: string, wordLimit: number = 30) => {
    const paragraphs = text.split("\n\n");
    let wordCount = 0;
    let truncatedParagraphs = [];

    for (const paragraph of paragraphs) {
      const paragraphWords = paragraph.split(" ");
      if (wordCount + paragraphWords.length <= wordLimit) {
        truncatedParagraphs.push(paragraph);
        wordCount += paragraphWords.length;
      } else {
        // Add partial paragraph if there's room
        const remainingWords = wordLimit - wordCount;
        if (remainingWords > 0) {
          const partialParagraph =
            paragraphWords.slice(0, remainingWords).join(" ") + "...";
          truncatedParagraphs.push(partialParagraph);
        }
        break;
      }
    }

    return truncatedParagraphs;
  };

  // Helper function to check if description needs truncation
  const shouldShowReadMore = (text: string, wordLimit: number = 30) => {
    const words = text.replace(/\n\n/g, " ").split(" ");
    return words.length > wordLimit;
  };

  // Helper function to format description with proper line breaks
  const formatDescription = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => (
      <Text key={index} className="text-[13px] text-light-gray mb-3 last:mb-0">
        {paragraph}
      </Text>
    ));
  };

  // Helper function to render truncated paragraphs
  const renderTruncatedDescription = (paragraphs: string[]) => {
    return paragraphs.map((paragraph, index) => (
      <Text key={index} className="text-[13px] text-light-gray mb-3 last:mb-0">
        {paragraph}
      </Text>
    ));
  };
  const lessonsLabel = course.features.find((f) =>
    /lesson/i.test(f.label)
  )?.label;
  const classesCount = lessonsLabel
    ? lessonsLabel.replace(/[^0-9]/g, "")
    : undefined;
  const classesText = classesCount ? `${classesCount} Class` : "21 Class";
  const hoursText = "42 Hours";

  const icons = {
    video: require("../assets/icons/video.svg"),
    lesson: require("../assets/icons/lesson-icon.svg"),
    device: require("../assets/icons/mobile.svg"),
    level: require("../assets/icons/level.svg"),
    audio: require("../assets/icons/audio.svg"),
    lifetime: require("../assets/icons/lifetime.svg"),
    quiz: require("../assets/icons/quiz.svg"),
    certificate: require("../assets/icons/lesson-icon.svg"),
    default: require("../assets/icons/lesson-icon.svg"),
  };
  // Map feature label to an icon component
  const featureIcon = (label: string) => {
    const lower = label.toLowerCase();

    let source = icons.default;

    if (lower.includes("lesson")) source = icons.lesson;
    else if (
      lower.includes("access mobile") ||
      lower.includes("desktop") ||
      lower.includes("tv")
    )
      source = icons.device;
    else if (lower.includes("beginner") || lower.includes("level"))
      source = icons.level;
    else if (lower.includes("audio")) source = icons.audio;
    else if (lower.includes("lifetime")) source = icons.lifetime;
    else if (lower.includes("quiz")) source = icons.quiz;
    else if (lower.includes("certificate")) source = icons.certificate;

    return (
      <Image
        source={source}
        style={{ width: 18, height: 18, resizeMode: "contain" }}
      />
    );
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Top hero image placeholder */}
        <View className="w-full h-[220px] bg-black overflow-hidden">
          {course.image ? (
            <Image
              source={course.image}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : null}

          {/* Back button overlay */}
          <View className="absolute left-4 top-10">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.8}
              className="w-10 h-10 rounded-full bg-white/90 items-center justify-center"
            >
              <ArrowLeft size={22} color="#0B1354" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-8">
          {/* Floating course card */}
          <View className="relative">
            <View
              className="bg-white rounded-2xl pt-9 pb-[26px] -mt-[34px]"
              style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
            >
              {/* Floating bookmark action */}
              <View className="absolute -top-4 right-5">
                <View
                  className="w-10 h-10 rounded-full bg-[#0FB77A] items-center justify-center"
                  style={{ boxShadow: "0px 4px 10px 0px #00000029" }}
                >
                  <Bookmark size={18} color="#FFFFFF" />
                </View>
              </View>

              <View className="flex-row items-start justify-between px-5">
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-destructive">
                      {course.category}
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Star size={14} color="#FAC025" fill="#FAC025" />
                      <Text className="text-[11px] font-mulish-extrabold text-dark-blue">
                        {course.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[18px] font-jost-semibold text-dark-blue mt-1 line-clamp-1">
                    {course.title}
                  </Text>

                  {/* Meta: classes and hours with icons */}
                  <View className="flex-row flex-wrap items-center justify-between gap-3 mt-2">
                    <View className="flex-row flex-wrap items-center gap-2.5">
                      <View className="flex-row items-center gap-2">
                        <Image source={icons.video} style={{ width: 18, height: 18}} resizeMode="contain"/>
                        <Text className="text-[12px] text-dark-blue">
                          {classesText}
                        </Text>
                      </View>
                      <View className="w-[3px] h-[18px] bg-black" />
                      <View className="flex-row items-center gap-2">
                        <Clock size={18} color="#111224" />
                        <Text className="text-[12px] text-dark-blue">
                          {hoursText}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-[18px] font-mulish-extrabold text-primary">
                      {course.price}/-
                    </Text>
                  </View>
                </View>
              </View>

              {/* Tabs: About / Curriculum refined styling */}
              <View className="mt-4">
                <View className="flex-row items-stretch  overflow-hidden">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab("About")}
                    className={`flex-1 items-center p-4 border-2 ${activeTab === "About" ? "bg-[#F5F9FF] border-[#E8F1FF]" : "bg-[#E8F1FF] border-[#E8F1FF]"}`}
                  >
                    <Text className="text-dark-blue font-jost-semibold">
                      About
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab("Curriculum")}
                    className={`flex-1 items-center p-4 border-2 ${activeTab === "Curriculum" ? "bg-[#F5F9FF] border-[#E8F1FF]" : "bg-[#E8F1FF] border-[#E8F1FF]"}`}
                  >
                    <Text className="text-dark-blue font-jost-semibold">
                      Curriculum
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {activeTab === "About" ? (
                <View className="mt-4 px-5">
                  {showFullDescription ? (
                    <View>
                      {formatDescription(course.description)}
                      <TouchableOpacity
                        onPress={() => setShowFullDescription(false)}
                        activeOpacity={0.7}
                        className=""
                      >
                        <Text className="text-primary font-mulish-bold">
                          Show Less
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      {renderTruncatedDescription(
                        getTruncatedDescription(course.description)
                      )}
                      {shouldShowReadMore(course.description) && (
                        <TouchableOpacity
                          onPress={() => setShowFullDescription(true)}
                          activeOpacity={0.7}
                          className="mt-2"
                        >
                          <Text className="text-primary font-mulish-bold">
                            Read More
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View className="mt-4 px-5">
                  {/* Section header */}
                  <View className="flex-row items-center justify-between py-2">
                    <Text className="text-[13px] text-dark-blue">
                      Section 01 -{" "}
                      <Text className="text-primary">Introducation</Text>
                    </Text>
                    <Text className="text-primary text-[12px] font-mulish-extrabold">
                      25 Mins
                    </Text>
                  </View>
                  <View className="h-[1px] bg-[#E5E7EB]" />

                  {/* Lesson 1 */}
                  <View className="py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-[42px] h-[42px] rounded-full bg-[#E9F2FF] items-center justify-center">
                        <Text className="text-primary font-mulish-extrabold">
                          01
                        </Text>
                      </View>
                      <View>
                        <Text className="text-[14px] text-dark-blue line-clamp-1">
                          Why Using Graphic De..
                        </Text>
                        <Text className="text-[12px] text-light-gray">
                          15 Mins
                        </Text>
                      </View>
                    </View>
                    <View className="w-[34px] h-[34px] rounded-full bg-primary items-center justify-center">
                      <Play size={16} color="#FFFFFF" />
                    </View>
                  </View>
                  <View className="h-[1px] bg-[#E5E7EB]" />

                  {/* Lesson 2 */}
                  <View className="py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-[42px] h-[42px] rounded-full bg-[#E9F2FF] items-center justify-center">
                        <Text className="text-primary font-mulish-extrabold">
                          02
                        </Text>
                      </View>
                      <View>
                        <Text className="text-[14px] text-dark-blue line-clamp-1">
                          Setup Your Graphic De..
                        </Text>
                        <Text className="text-[12px] text-light-gray">
                          10 Mins
                        </Text>
                      </View>
                    </View>
                    <View className="w-[34px] h-[34px] rounded-full bg-primary items-center justify-center">
                      <Play size={16} color="#FFFFFF" />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Instructor */}
          <View className="mt-6">
            <Text className="text-light-gray text-[13px] mb-3">Instructor</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-[44px] h-[44px] rounded-full bg-black overflow-hidden">
                  {course.instructor.avatar && (
                    <Image
                      source={course.instructor.avatar}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[15px] font-jost-semibold text-dark-blue">
                      {course.instructor.name}
                    </Text>
                    {course.instructor.verified && (
                      <BadgeCheck size={16} color="#0FB77A" />
                    )}
                  </View>
                  <Text className="text-[13px] text-[#545454]">
                    {course.instructor.title}
                  </Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <View className="w-[32px] h-[32px] rounded-full border border-[#E5E7EB] items-center justify-center">
                  <MessageCircle size={16} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* What you'll get */}
          <View className="mt-6">
            <Text className="text-light-gray text-[13px] mb-3">
              What You’ll Get
            </Text>
            <View className="gap-4">
              {course.features.map((f, idx) => (
                <View key={idx} className="flex-row items-center gap-3">
                  <View className="w-5 h-5 items-center justify-center">
                    {featureIcon(f.label)}
                  </View>
                  <Text className="text-[14px] text-[#545454]">{f.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews */}
          {course.reviewsList.length > 0 && (
            <View className="mt-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-dark-blue font-jost-semibold text-[18px]">Reviews</Text>
                <TouchableOpacity
                  className="flex-row items-center gap-1"
                  activeOpacity={0.7}
                  onPress={() => setShowAllReviews(true)}
                >
                  <Text className="text-primary text-[12px] font-mulish-extrabold">
                    SEE ALL
                  </Text>
                  <ChevronRight size={16} color="#0961F5" />
                </TouchableOpacity>
              </View>

              <View className="gap-3">
                {course.reviewsList.slice(0, 2).map((r) => (
                  <View
                    key={r.id}
                    className="bg-white rounded-2xl p-4"
                    style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
                  >
                    <View className="flex-row items-start justify-between">
                      <View className="flex-row items-center flex-1 gap-3">
                        <View className="w-[36px] h-[36px] rounded-full bg-black" />
                        <View className="flex-row items-center justify-between flex-1 gap-3">
                          <Text className="text-[14px] font-jost-semibold text-dark-blue">
                            {r.user}
                          </Text>
                          <View className="flex-row items-center gap-[2px] border border-primary px-3 py-[5px] rounded-full bg-[#E8F1FF]">
                            <Star size={12} color="#FAC025" fill="#FAC025" />
                            <Text className="text-[13px] text-dark-blue font-jost-semibold">
                              {r.rating.toFixed(1)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Text className="text-[13px] font-mulish-bold text-[#545454] mt-2 mb-3">
                      {r.text}
                    </Text>
                    <View className="flex-row items-center gap-5">
                      <Text className="text-[12px] font-mulish-extrabold text-dark-blue flex flex-row items-center gap-2">
                        <Heart size={18} color="#DD2E44" /> {r.likes}
                      </Text>
                      <Text className="text-[12px] font-extrabold text-dark-blue">
                        {r.timeAgo}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="absolute left-0 right-0 bottom-0 px-8 py-4 bg-transparent">
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-primary rounded-full py-4 items-center"
        >
          <Text className="text-white font-jost-semibold">
            Enroll Course - {course.price}/-
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reviews Modal */}
      <Modal
        visible={showAllReviews}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAllReviews(false)}
      >
        <View className="flex-1 bg-[#F5F9FF]">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-[#E5E7EB]">
            <Text className="text-[18px] font-jost-semibold text-dark-blue">
              All Reviews
            </Text>
            <TouchableOpacity
              onPress={() => setShowAllReviews(false)}
              activeOpacity={0.7}
              className="w-8 h-8 rounded-full bg-[#F3F4F6] items-center justify-center"
            >
              <X size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Reviews List */}
          <ScrollView
            className="flex-1 px-6 py-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="gap-4">
              {course.reviewsList.map((r) => (
                <View
                  key={r.id}
                  className="bg-white rounded-2xl p-4"
                  style={{ boxShadow: "0px 4px 10px 0px #00000014" }}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-[44px] h-[44px] rounded-full bg-black" />
                      <View>
                        <Text className="text-[15px] font-jost-semibold text-dark-blue">
                          {r.user}
                        </Text>
                        <View className="flex-row items-center gap-1 mt-1">
                          <Star size={14} color="#FAC025" fill="#FAC025" />
                          <Text className="text-[12px] text-dark-blue font-mulish-extrabold">
                            {r.rating.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text className="text-[14px] text-light-gray mt-3 mb-4 leading-5">
                    {r.text}
                  </Text>
                  <View className="flex-row items-center gap-4">
                    <Text className="text-[12px] text-light-gray">
                      ❤ {r.likes}
                    </Text>
                    <Text className="text-[12px] text-light-gray">
                      {r.timeAgo}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
