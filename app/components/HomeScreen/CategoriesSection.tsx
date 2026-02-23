import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import SectionHeader from './SectionHeader';
import CategoryPill from './CategoryPill';

const CATEGORIES = [
  '3D Design',
  'Arts & Humanities',
  'Graphic Design',
];

interface CategoriesSectionProps {
  onSelectCategory?: (category: string) => void;
  onSeeAll?: () => void;
}

export default function CategoriesSection({
  onSelectCategory,
  onSeeAll,
}: CategoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Arts & Humanities');

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory?.(category);
  };

  return (
    <View>
      <SectionHeader title="Categories" onSeeAll={onSeeAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 15, gap: 25 }}
        scrollEventThrottle={16}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
              key={category}
              onPress={() => handleSelectCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                className={`text-[15px] font-mulish-bold ${
                  selectedCategory === category ? 'text-primary' : 'text-light-gray'
                }`}
              >
                {category}
              </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
