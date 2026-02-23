import React, { useMemo, useRef, useState } from 'react';
import { ScrollView, View, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/HomeScreen/Header';
import SearchBar from '../components/SearchBar';
import CategoriesSection from '../components/HomeScreen/CategoriesSection';
import PopularCoursesSection from '../components/HomeScreen/PopularCoursesSection';
import TopMentorsSection from '../components/HomeScreen/TopMentorsSection';
import PromoCard from '../components/HomeScreen/PromoCard';

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const H_PADDING = 32; // px-8
  const ITEM_GAP = 0;
  const itemWidth = useMemo(() => screenWidth - H_PADDING * 2, [screenWidth]);
  const snapInterval = itemWidth + ITEM_GAP;
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const promos = [
    {
      id: '1',
      discount: '25% OFF*',
      title: "Today’s Special",
      description: "Get a Discount for Every Course Order only Valid for Today.!",
    },
    {
      id: '2',
      discount: '40% OFF',
      title: "Flash Sale",
      description: "Limited time offer on all courses this week!",
    },
    {
      id: '3',
      discount: '30% OFF',
      title: "Weekend Deal",
      description: "Special price for weekend learners only!",
    },
    {
      id: '4',
      discount: '25% OFF*',
      title: "Today’s Special",
      description: "Get a Discount for Every Course Order only Valid for Today.!",
    },
    {
      id: '5',
      discount: '40% OFF',
      title: "Flash Sale",
      description: "Limited time offer on all courses this week!",
    },
  ];

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

      <View style={{ marginTop: 12, position: 'relative' }}>
        <FlatList
          ref={listRef}
          data={promos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={snapInterval}
          decelerationRate="fast"
          disableIntervalMomentum
          contentContainerStyle={{ paddingHorizontal: 0 }}
          ItemSeparatorComponent={() => <View style={{ width: ITEM_GAP }} />}
          renderItem={({ item }) => (
            <PromoCard
              discount={item.discount}
              title={item.title}
              description={item.description}
              onPress={() => console.log('[v0] Promo clicked', item.id)}
              containerStyle={{ width: itemWidth }}
            />
          )}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const index = Math.round(x / snapInterval);
            if (index !== activeIndex) setActiveIndex(index);
          }}
          scrollEventThrottle={16}
        />
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 50, flexDirection: 'row', justifyContent: 'center' }}>
          {promos.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() => {
                  const target = Math.max(0, Math.min(i, promos.length - 1));
                  listRef.current?.scrollToOffset({ offset: target * snapInterval, animated: true });
                  setActiveIndex(target);
                }}
                style={{ marginHorizontal: 6 }}
              >
                <View
                  style={{
                    width: isActive ? 22 : 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: isActive ? '#FAC840' : '#1A6EFC'
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

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
