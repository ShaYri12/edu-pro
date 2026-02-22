import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({ 
  placeholder = 'Search for...',
  onSearch,
  onFilterPress
}: SearchBarProps) {
  const [text, setText] = useState('');

  const handleSearch = (value: string) => {
    setText(value);
    onSearch?.(value);
  };

  return (
    <View className="py-3 flex-row items-center gap-3">
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-2xl px-4 py-3.5 border border-gray-200">
        <Search size={20} color="#999" strokeWidth={1.5} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#BFBFBF"
          value={text}
          onChangeText={handleSearch}
          className="flex-1 ml-3 text-base text-text font-medium"
        />
      </View>
      <TouchableOpacity 
        onPress={onFilterPress}
        className="bg-primary rounded-2xl w-12 h-12 items-center justify-center"
      >
        <SlidersHorizontal size={24} color="#FFFFFF" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}
