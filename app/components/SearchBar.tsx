import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({
  placeholder = 'Search for...',
  onSearch,
  onFilterPress,
}: SearchBarProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);   // ← NEW: tracks focus

  const handleSearch = (value: string) => {
    setText(value);
    onSearch?.(value);
  };

  return (
    <View
      className={`
        flex-row items-center 
        bg-white
        rounded-[15px] p-[13px] h-[64px]
        border border-transparent
        transition-all duration-200
        ${isFocused 
          ? 'border-primary shadow-xl shadow-primary/20'   // ← Whole bar highlights
          : 'shadow-[0px_3px_12px_0px_#0000001A]'
        }
      `}
    >
      {/* Search Icon */}
      <Image
        source={require("@/assets/icons/search.svg")}
        className="w-[20px] h-[20px]"
        resizeMode="contain"
      />

      {/* Input */}
      <TextInput
        placeholder={placeholder}
        onChangeText={handleSearch}
        placeholderTextColor="#9CA3AF"
        className="flex-1 ml-[9px] text-base text-dark-blue"
        
        // Focus handlers for the whole bar
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
        // Optional: make input itself look better when focused
        style={{ outline: 'none' }} // for web
      />

      {/* Filter Button */}
      <TouchableOpacity
        onPress={onFilterPress}
        className="ml-[10px] bg-primary w-[38px] h-[38px] rounded-[10px] items-center justify-center active:opacity-80"
      >
        <Image
          source={require("@/assets/icons/filter.svg")}
          className="w-[19.29px] h-[18px]"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}