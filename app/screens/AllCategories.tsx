import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const CATEGORIES = [
  { label: '3D Design', image: require('@/assets/icons/3d-design.svg') },
  { label: 'Graphic Design', image: require('@/assets/icons/graphic-design.svg') },
  { label: 'Web Development', image: require('@/assets/icons/web-development.svg') },
  { label: 'SEO & Marketing', image: require('@/assets/icons/seo-marketing.svg') },
  { label: 'Finance & Accounting', image: require('@/assets/icons/finance-accounting.svg') },
  { label: 'Personal Development', image: require('@/assets/icons/personal-development.svg') },
  { label: 'Office Productivity', image: require('@/assets/icons/office-productivity.svg') },
  { label: 'HR Management', image: require('@/assets/icons/hr-management.svg') },
];

interface AllCategoriesProps {
  onBack?: () => void;
}

export default function AllCategories({ onBack }: AllCategoriesProps) {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <ScrollView
        className="p-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-[30px]">
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft size={24} color="#0B1354" />
          </TouchableOpacity>
          <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
            All Category
          </Text>
        </View>

        {/* SearchBar */}
        <SearchBar onFocusInput={() => router.push('/search')} />

        {/* 2-Column Grid */}
        <View className="mt-[57px] flex-row flex-wrap justify-between gap-x-8 gap-y-14">
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.label}
              className="w-[calc(50%-16px)] items-center active:opacity-80"   // ← Perfect 2 columns
            >
              <Image
                source={item.image}
                className="w-[40px] h-[40px]"
                resizeMode="contain"
              />
              <Text className="mt-[7px] text-center text-dark-blue text-sm opacity-80 font-mulish-medium">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}