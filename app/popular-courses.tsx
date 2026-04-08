import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import CategoryPill from './components/HomeScreen/CategoryPill';
import CourseCard from './components/CourseCard';
import { useRouter } from 'expo-router';
import { listCoursesByCategory } from '@/constants/courses';

const COURSE_CATEGORIES = ['All', 'Graphic Design', '3D Design', 'Arts & Humanities', 'Web Development', 'SEO & Marketing', 'Finance & Accounting', 'Personal Development', 'Office Productivity', 'HR Management'];

// Data is sourced from centralized courses module via helpers

export default function PopularCoursesRoute() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filtered = useMemo(() => listCoursesByCategory(selectedCategory), [selectedCategory]);

  return (
    <ScrollView
      className="flex-1 bg-[#F5F9FF] p-6"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      {/* Header */}
      <View className="flex-row items-center mb-[30px]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#0B1354" />
        </TouchableOpacity>
        <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
          Popular Courses
        </Text>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, marginBottom: 20, gap: 12 }}
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

      {/* Course list */}
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
  );
}
