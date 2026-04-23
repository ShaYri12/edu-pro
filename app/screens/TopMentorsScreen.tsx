import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import MentorCard from '../components/MentorCard';
import { mentors as ALL_MENTORS } from '@/constants/courses';
import { useAppStateBackground } from '@/hooks/useAppStateBackground';

const MENTORS = ALL_MENTORS;

export default function TopMentorsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const backgroundKey = useAppStateBackground();
  
  const onMentorPress = (mentorId: number) => {
    console.log('[v0] Mentor selected:', mentorId);
    router.push(`/mentor?id=${mentorId}`);
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <View className="flex-1 bg-[#F5F9FF]">
        <SafeAreaView className="flex-1" edges={['top']}>
          <View className="p-6 flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-[10px]">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <ArrowLeft size={24} color="#0B1354" />
            </TouchableOpacity>
            <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">Top Mentors</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/search')} activeOpacity={0.7}>
            <SearchIcon size={20} color="#0B1354" />
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={MENTORS}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View className="h-[1px] bg-[#F5F9FF] my-[12px]" />}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
              <MentorCard
                key={item.id}
                name={item.name}
                category={item.category}
                image={item.avatar}
                onPress={() => onMentorPress(item.id)}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: Math.max(insets.bottom + 40, 60) }}
        />
      </View>
    </SafeAreaView>
    </View>
    </View>
  );
}
