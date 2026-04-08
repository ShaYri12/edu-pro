import React from 'react';
import { View, ScrollView } from 'react-native';
import SectionHeader from './SectionHeader';
import MentorCard from '../MentorCard';
import { useRouter } from 'expo-router';
import { getTopMentors } from '@/constants/courses';

const MENTORS = getTopMentors(9);

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

  const handleMentorPress = (mentorId: number) => {
    if (onMentorPress) return onMentorPress(mentorId);
    router.push(`/mentor?id=${mentorId}`);
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
            image={mentor.avatar}
            onPress={() => handleMentorPress(mentor.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
