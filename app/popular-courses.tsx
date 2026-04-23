import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import CategoryPill from './components/HomeScreen/CategoryPill';
import CourseCard from './components/CourseCard';
import { useRouter } from 'expo-router';
import { listCoursesByCategory } from '@/constants/courses';
import { useAppStateBackground } from '@/hooks/useAppStateBackground';

const COURSE_CATEGORIES = ['All', 'Graphic Design', '3D Design', 'Arts & Humanities', 'Web Development', 'SEO & Marketing', 'Finance & Accounting', 'Personal Development', 'Office Productivity', 'HR Management'];

export default function PopularCoursesRoute() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filtered = useMemo(() => listCoursesByCategory(selectedCategory), [selectedCategory]);
  const insets = useSafeAreaInsets();
  const backgroundKey = useAppStateBackground();

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <View className="flex-1 bg-[#F5F9FF]">
        <SafeAreaView className="flex-1" edges={['top']}>
          <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-6 pb-4">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <ArrowLeft size={24} color="#0B1354" />
          </TouchableOpacity>
          <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
            Popular Courses
          </Text>
        </View>

        {/* Categories */}
        <View className="px-6 mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10, gap: 12 }}
            scrollEventThrottle={16}
          >
            {COURSE_CATEGORIES.map((category) => (
              <CategoryPill
                key={category}
                label={category}
                isActive={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Course list */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 40) }}
        >
          <View className="gap-4">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                category={course.category}
                rating={course.rating}
                reviews={course.reviews}
                price={`${course.price}/-`}
                students={`${course.students}`}
                image={course.image}
                variant="list"
                onPress={() => router.push({ pathname: '/course', params: { id: String(course.id) } })}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
    </View>
    </View>
  );
}
