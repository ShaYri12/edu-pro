import React from 'react';
import { View, ScrollView } from 'react-native';
import SectionHeader from './SectionHeader';
import MentorCard from '../MentorCard';
import { useRouter } from 'expo-router';

const MENTORS = [
  { id: 1, name: 'Jiya' },
  { id: 2, name: 'Aman' },
  { id: 3, name: 'Rahul J' },
  { id: 4, name: 'Manav' },
  { id: 5, name: 'Vrushab. M' },
  { id: 6, name: 'Robert William' },
  { id: 7, name: 'Soman' },
  { id: 8, name: 'Manav' },
  { id: 9, name: 'Vrushab. M' },
];

interface TopMentorsSectionProps {
  onSeeAll?: () => void;
  onMentorPress?: (mentorId: number) => void;
}

export default function TopMentorsSection({
  onSeeAll,
  onMentorPress,
}: TopMentorsSectionProps) {
  const router = useRouter();
  const handleSeeAll = () => {
    if (onSeeAll) return onSeeAll();
    router.push('/top-mentors');
  };
  return (
    <View>
      <SectionHeader title="Top Mentor" onSeeAll={handleSeeAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 15, gap: 18 }}
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
