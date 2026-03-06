import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Star,
  ChevronRight,
  Bookmark,
  BookOpen,
  Clock,
  MonitorSmartphone,
  BarChart3,
  Headphones,
  Infinity as InfinityIcon,
  ListChecks,
  BadgeCheck,
  MessageCircle,
  Play,
} from 'lucide-react-native';
import { getCourseById } from '@/constants/courses';

export default function CourseDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const course = useMemo(() => getCourseById(id || ''), [id]);
  const [activeTab, setActiveTab] = useState<'About' | 'Curriculum'>('About');

  if (!course) {
    return (
      <View className="flex-1 bg-[#F5F9FF] p-8">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="mb-4">
          <ArrowLeft size={24} color="#0B1354" />
        </TouchableOpacity>
        <Text className="text-dark-blue font-jost-semibold text-[18px]">Course not found</Text>
      </View>
    );
  }

  // Derive class count and hours (fallbacks for demo)
  const lessonsLabel = course.features.find((f) => /lesson/i.test(f.label))?.label;
  const classesCount = lessonsLabel ? lessonsLabel.replace(/[^0-9]/g, '') : undefined;
  const classesText = classesCount ? `${classesCount} Class` : '21 Class';
  const hoursText = '42 Hours';

  // Map feature label to an icon component
  const featureIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('lesson')) return <BookOpen size={18} color="#0B1354" />;
    if (lower.includes('access mobile') || lower.includes('desktop') || lower.includes('tv')) return <MonitorSmartphone size={18} color="#0B1354" />;
    if (lower.includes('beginner') || lower.includes('level')) return <BarChart3 size={18} color="#0B1354" />;
    if (lower.includes('audio')) return <Headphones size={18} color="#0B1354" />;
    if (lower.includes('lifetime')) return <InfinityIcon size={18} color="#0B1354" />;
    if (lower.includes('quiz')) return <ListChecks size={18} color="#0B1354" />;
    if (lower.includes('certificate')) return <BadgeCheck size={18} color="#0B1354" />;
    return <ListChecks size={18} color="#0B1354" />;
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
            <Image source={course.image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
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
              style={{ boxShadow: '0px 4px 10px 0px #00000014' }}
            >
              {/* Floating bookmark action */}
              <View className="absolute -top-4 right-5">
                <View className="w-10 h-10 rounded-full bg-[#0FB77A] items-center justify-center" style={{ boxShadow: '0px 4px 10px 0px #00000029' }}>
                  <Bookmark size={18} color="#FFFFFF" />
                </View>
              </View>

              <View className="flex-row items-start justify-between px-5">
                <View className="flex-1 pr-3">
                  <Text className="text-xs text-destructive">{course.category}</Text>
                  <Text className="text-[18px] font-jost-semibold text-dark-blue mt-1 line-clamp-2">
                    {course.title}
                  </Text>

                  {/* Meta: classes and hours with icons */}
                  <View className="flex-row items-center gap-4 mt-2">
                    <View className="flex-row items-center gap-1">
                      <BookOpen size={14} color="#6B7280" />
                      <Text className="text-[12px] text-light-gray">{classesText}</Text>
                    </View>
                    <View className="w-[4px] h-[4px] rounded-full bg-[#D1D5DB]" />
                    <View className="flex-row items-center gap-1">
                      <Clock size={14} color="#6B7280" />
                      <Text className="text-[12px] text-light-gray">{hoursText}</Text>
                    </View>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center gap-1">
                    <Star size={14} color="#FAC025" fill="#FAC025" />
                    <Text className="text-[11px] font-mulish-extrabold text-dark-blue">{course.rating.toFixed(1)}</Text>
                  </View>
                  <Text className="text-[18px] font-mulish-extrabold text-primary mt-2">{course.price}/-</Text>
                </View>
              </View>

              {/* Tabs: About / Curriculum refined styling */}
              <View className="mt-4">
                <View className="flex-row items-stretch  overflow-hidden">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab('About')}
                    className={`flex-1 items-center p-4 border-2 ${activeTab === 'About' ? 'bg-[#F5F9FF] border-[#E8F1FF]' : 'bg-[#E8F1FF] border-[#E8F1FF]'}`}
                  >
                    <Text className="text-dark-blue font-jost-semibold">About</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab('Curriculum')}
                    className={`flex-1 items-center p-4 border-2 ${activeTab === 'Curriculum' ? 'bg-[#F5F9FF] border-[#E8F1FF]' : 'bg-[#E8F1FF] border-[#E8F1FF]'}`}
                  >
                    <Text className="text-dark-blue font-jost-semibold">Curriculum</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {activeTab === 'About' ? (
                <Text className="text-[13px] text-light-gray mt-4 px-5">
                  {course.description} <Text className="text-primary">Read More</Text>
                </Text>
              ) : (
                <View className="mt-4 px-5">
                  {/* Section header */}
                  <View className="flex-row items-center justify-between py-2">
                    <Text className="text-[13px] text-dark-blue">
                      Section 01 - <Text className="text-primary">Introducation</Text>
                    </Text>
                    <Text className="text-primary text-[12px] font-mulish-extrabold">25 Mins</Text>
                  </View>
                  <View className="h-[1px] bg-[#E5E7EB]" />

                  {/* Lesson 1 */}
                  <View className="py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-[42px] h-[42px] rounded-full bg-[#E9F2FF] items-center justify-center">
                        <Text className="text-primary font-mulish-extrabold">01</Text>
                      </View>
                      <View>
                        <Text className="text-[14px] text-dark-blue line-clamp-1">Why Using Graphic De..</Text>
                        <Text className="text-[12px] text-light-gray">15 Mins</Text>
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
                        <Text className="text-primary font-mulish-extrabold">02</Text>
                      </View>
                      <View>
                        <Text className="text-[14px] text-dark-blue line-clamp-1">Setup Your Graphic De..</Text>
                        <Text className="text-[12px] text-light-gray">10 Mins</Text>
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
                    <Image source={course.instructor.avatar} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  )}
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[15px] font-jost-semibold text-dark-blue">{course.instructor.name}</Text>
                    {course.instructor.verified && <BadgeCheck size={16} color="#0FB77A" />}
                  </View>
                  <Text className="text-[13px] text-[#545454]">{course.instructor.title}</Text>
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
            <Text className="text-light-gray text-[13px] mb-3">What You’ll Get</Text>
            <View className="gap-4">
              {course.features.map((f, idx) => (
                <View key={idx} className="flex-row items-center gap-3">
                  <View className="w-[34px] h-[34px] rounded-lg bg-[#E9F2FF] items-center justify-center">
                    {featureIcon(f.label)}
                  </View>
                  <Text className="text-[14px] text-[#0B1354]">{f.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews */}
          {course.reviewsList.length > 0 && (
            <View className="mt-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-light-gray text-[13px]">Reviews</Text>
                <TouchableOpacity className="flex-row items-center gap-1" activeOpacity={0.7}>
                  <Text className="text-primary text-[12px] font-mulish-extrabold">SEE ALL</Text>
                  <ChevronRight size={16} color="#0961F5" />
                </TouchableOpacity>
              </View>

              <View className="gap-3">
                {course.reviewsList.map((r) => (
                  <View key={r.id} className="bg-white rounded-2xl p-4" style={{ boxShadow: '0px 4px 10px 0px #00000014' }}>
                    <View className="flex-row items-start justify-between">
                      <View className="flex-row items-center gap-3">
                        <View className="w-[36px] h-[36px] rounded-full bg-black" />
                        <View>
                          <Text className="text-[14px] font-jost-semibold text-dark-blue">{r.user}</Text>
                          <View className="flex-row items-center gap-1">
                            <Star size={12} color="#FAC025" fill="#FAC025" />
                            <Text className="text-[11px] text-dark-blue font-mulish-extrabold">{r.rating.toFixed(1)}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Text className="text-[13px] text-light-gray mt-2 mb-3">{r.text}</Text>
                    <View className="flex-row items-center gap-4">
                      <Text className="text-[12px] text-light-gray">❤ {r.likes}</Text>
                      <Text className="text-[12px] text-light-gray">{r.timeAgo}</Text>
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
        <TouchableOpacity activeOpacity={0.8} className="bg-primary rounded-full py-4 items-center">
          <Text className="text-white font-jost-semibold">Enroll Course - {course.price}/-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
