import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import Header from '../components/HomeScreen/Header';
import SearchBar from '../components/SearchBar';
import PromoCard from '../components/HomeScreen/PromoCard';
import CategoriesSection from '../components/HomeScreen/CategoriesSection';
import PopularCoursesSection from '../components/HomeScreen/PopularCoursesSection';
import TopMentorsSection from '../components/HomeScreen/TopMentorsSection';

export default function HomeScreen() {
  const handleSearch = (text: string) => {
    console.log('[v0] Searching for:', text);
  };

  const handleFilterPress = () => {
    console.log('[v0] Filter pressed');
  };

  const handleBellPress = () => {
    console.log('[v0] Notifications');
  };

  const handleSeeAllCategories = () => {
    console.log('[v0] See all categories');
  };

  const handleSelectCategory = (category: string) => {
    console.log('[v0] Selected category:', category);
  };

  const handleSeeAllCourses = () => {
    console.log('[v0] See all courses');
  };

  const handleCoursePress = (courseId: number) => {
    console.log('[v0] Course selected:', courseId);
  };

  const handleSeeAllMentors = () => {
    console.log('[v0] See all mentors');
  };

  const handleMentorPress = (mentorId: number) => {
    console.log('[v0] Mentor selected:', mentorId);
  };

  return (
    <ScrollView
      className="flex-1 bg-[#F5F9FF] px-8 py-8"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      <Header userName="ALEX" onBellPress={handleBellPress} />

      <SearchBar onSearch={handleSearch} onFilterPress={handleFilterPress} />

      <PromoCard
        discount="25% OFF*"
        title="Today's Special"
        description="Get a Discount for Every Course Order only Valid for Today!"
        onPress={() => console.log('[v0] Promo clicked')}
      />

      <CategoriesSection
        onSelectCategory={handleSelectCategory}
        onSeeAll={handleSeeAllCategories}
      />

      <PopularCoursesSection
        onSeeAll={handleSeeAllCourses}
        onCoursePress={handleCoursePress}
      />

      <TopMentorsSection
        onSeeAll={handleSeeAllMentors}
        onMentorPress={handleMentorPress}
      />
    </ScrollView>
  );
}
