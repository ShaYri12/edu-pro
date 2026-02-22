import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
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
        contentContainerStyle={{ paddingBottom: 16, gap: 12 }}
        scrollEventThrottle={16}
      >
        {CATEGORIES.map((category) => (
          <CategoryPill
            key={category}
            label={category}
            isActive={selectedCategory === category}
            onPress={() => handleSelectCategory(category)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
