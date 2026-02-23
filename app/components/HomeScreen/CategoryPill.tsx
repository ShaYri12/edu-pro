import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryPill({
  label,
  isActive = false,
  onPress,
}: CategoryPillProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-[18px] py-[7px] rounded-full ${
        isActive ? 'bg-secondary' : 'bg-[#E8F1FF]'
      }`}
    >
      <Text
        className={`text-[13px] ${
          isActive ? 'text-white' : 'text-dark-blue'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
