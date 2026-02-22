import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';

interface HeaderProps {
  userName: string;
  onBellPress?: () => void;
}

export default function Header({ userName, onBellPress }: HeaderProps) {
  return (
    <View className="pb-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-3xl font-bold text-text">Hi, {userName}</Text>
          <Text className="text-sm text-text-secondary font-medium mt-1">What would you like to learn Today?</Text>
          <Text className="text-xs text-text-secondary mt-1">Search Below.</Text>
        </View>
        <TouchableOpacity 
          onPress={onBellPress}
          className="w-10 h-10 rounded-full border-2 border-gray-300 items-center justify-center"
        >
          <Bell size={20} color="#999" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
