import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export default function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-[18px] font-jost-semibold text-dark-blue">{title}</Text>
      <TouchableOpacity onPress={onSeeAll} className="flex-row items-center gap-0.5 active:opacity-70">
        <Text className="text-primary font-mulish-extrabold text-xs">SEE ALL</Text>
        <ChevronRight size={20} color="#0961F5" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}
