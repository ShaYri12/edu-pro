import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import CategoryPill from './components/HomeScreen/CategoryPill';
import CourseCard from './components/CourseCard';
import { useRouter } from 'expo-router';

const COURSE_CATEGORIES = ['All', 'Graphic Design', '3D Design', 'Arts & I'];

const COURSES = [
  {
    id: 1,
    title: 'Graphic Design Advanced',
    category: 'Graphic Design',
    rating: 4.2,
    reviews: 122,
    price: '7058',
    students: '7830',
  },
  {
    id: 2,
    title: 'Advertisement Design',
    category: 'Graphic Design',
    rating: 3.9,
    reviews: 230,
    price: '800',
    students: '12680',
  },
  {
    id: 3,
    title: 'Graphic Design Advanced',
    category: 'Programming',
    rating: 4.2,
    reviews: 145,
    price: '599',
    students: '990',
  },
  {
    id: 4,
    title: 'Web Developer conce..',
    category: 'Web Development',
    rating: 4.9,
    reviews: 122,
    price: '499',
    students: '14580',
  },
];

export default function PopularCoursesRoute() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <ScrollView
      className="flex-1 bg-[#F5F9FF] p-8"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      {/* Header */}
      <View className="flex-row items-center mb-[30px]">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#0B1354" />
        </TouchableOpacity>
        <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
          All Category
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
        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            category={course.category}
            rating={course.rating}
            reviews={course.reviews}
            price={`${course.price}/-`}
            students={`${course.students}`}
            variant="list"
          />
        ))}
      </View>
    </ScrollView>
  );
}
