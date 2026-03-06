import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import SectionHeader from './SectionHeader';
import CategoryPill from './CategoryPill';
import CourseCard from '../CourseCard';
import { getTopCourses, listCoursesByCategory } from '@/constants/courses';

const COURSE_CATEGORIES = ['All', 'Graphic Design', '3D Design', 'Arts & Humanities', 'Web Development', 'SEO & Marketing', 'Finance & Accounting', 'Personal Development', 'Office Productivity', 'HR Management'];

interface PopularCoursesSectionProps {
  onSeeAll?: () => void;
  onCoursePress?: (courseId: number) => void;
}

export default function PopularCoursesSection({
  onSeeAll,
  onCoursePress,
}: PopularCoursesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <View>
      <SectionHeader title="Popular Courses" onSeeAll={onSeeAll} />

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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, gap: 20 }}
        scrollEventThrottle={16}
      >
        {(selectedCategory === 'All' ? getTopCourses(10) : listCoursesByCategory(selectedCategory)).map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            category={course.category}
            rating={course.rating}
            reviews={course.reviews}
            price={`${course.price}/-`}
            students={`${course.students}`}
            image={course.image}
            onPress={() => onCoursePress?.(course.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
