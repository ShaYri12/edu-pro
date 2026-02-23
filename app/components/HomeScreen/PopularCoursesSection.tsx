import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import SectionHeader from './SectionHeader';
import CategoryPill from './CategoryPill';
import CourseCard from '../CourseCard';

const COURSE_CATEGORIES = ['All', 'Graphic Design', '3D Design', 'Arts & I'];

const COURSES = [
  {
    id: 1,
    title: 'Graphic Design Advanced',
    category: 'Graphic Design',
    rating: 4.2,
    reviews: 122,
    price: '200',
  },
  {
    id: 2,
    title: 'Advertisement Design',
    category: 'Graphic Design',
    rating: 4.1,
    reviews: 230,
    price: '400',
  },
  {
    id: 3,
    title: '3D Modeling Basics',
    category: '3D Design',
    rating: 4.5,
    reviews: 145,
    price: '350',
  },
];

interface PopularCoursesSectionProps {
  onSeeAll?: () => void;
  onCoursePress?: (courseId: number) => void;
}

export default function PopularCoursesSection({
  onSeeAll,
  onCoursePress,
}: PopularCoursesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Graphic Design');

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
        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            category={course.category}
            rating={course.rating}
            reviews={course.reviews}
            price={`${course.price}/-`}
            onPress={() => onCoursePress?.(course.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
