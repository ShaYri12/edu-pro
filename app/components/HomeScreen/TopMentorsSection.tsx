import React from 'react';
import { View, ScrollView } from 'react-native';
import SectionHeader from './SectionHeader';
import MentorCard from '../MentorCard';

const MENTORS = [
  { id: 1, name: 'Jiya' },
  { id: 2, name: 'Aman' },
  { id: 3, name: 'Rahul J' },
  { id: 4, name: 'Manav' },
];

interface TopMentorsSectionProps {
  onSeeAll?: () => void;
  onMentorPress?: (mentorId: number) => void;
}

export default function TopMentorsSection({
  onSeeAll,
  onMentorPress,
}: TopMentorsSectionProps) {
  return (
    <View className="pt-4 pb-6">
      <SectionHeader title="Top Mentor" onSeeAll={onSeeAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 16, gap: 16 }}
        scrollEventThrottle={16}
      >
        {MENTORS.map((mentor) => (
          <MentorCard
            key={mentor.id}
            name={mentor.name}
            onPress={() => onMentorPress?.(mentor.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
