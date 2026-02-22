import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export default function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="py-4 flex-row items-center justify-between">
      <Text className="text-xl font-bold text-text">{title}</Text>
      <TouchableOpacity onPress={onSeeAll} className="flex-row items-center gap-0.5 active:opacity-70">
        <Text className="text-primary font-bold text-sm">SEE ALL</Text>
        <ChevronRight size={18} color="#007AFF" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}
