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
      className={`px-4 py-2.5 rounded-full ${
        isActive ? 'bg-secondary' : 'bg-white'
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          isActive ? 'text-white' : 'text-text-secondary'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
