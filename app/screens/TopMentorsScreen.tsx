import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import MentorCard from '../components/MentorCard';

const MENTORS = [
  { id: 1, name: 'Jiya Shetty', category: '3D Design' },
  { id: 2, name: 'Donald S', category: 'Arts & Humanities' },
  { id: 3, name: 'Aman', category: 'Personal Development' },
  { id: 4, name: 'Vrushab. M', category: 'SEO & Marketing' },
  { id: 5, name: 'Robert William', category: 'Office Productivity' },
  { id: 6, name: 'Soman', category: 'Web Development' },
  { id: 7, name: 'Jiya Shetty', category: '3D Design' },
  { id: 8, name: 'Donald S', category: 'Arts & Humanities' },
  { id: 9, name: 'Aman', category: 'Personal Development' },
  { id: 10, name: 'Vrushab. M', category: 'SEO & Marketing' },
  { id: 11, name: 'Robert William', category: 'Office Productivity' },
  { id: 12, name: 'Soman', category: 'Web Development' },
];

export default function TopMentorsScreen() {
  const router = useRouter();
  const onMentorPress = (mentorId: number) => {
    console.log('[v0] Mentor selected:', mentorId);
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <View className="p-8 flex-1">
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
                onPress={() => onMentorPress?.(item.id)}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
        />
      </View>
    </View>
  );
}
