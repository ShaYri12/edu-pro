import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { Search, SlidersHorizontal } from "lucide-react-native";
import SearchIcon from "@/assets/icons/search.svg";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  onFocusInput?: () => void; // Navigate to search page when focusing
  autoFocus?: boolean; // Auto focus input when mounted
  onSubmitEditing?: () => void; // Handle keyboard submit
  iconType?: "filter" | "search"; // New prop to control icon type
}

export default function SearchBar({
  placeholder = "Search for...",
  onSearch,
  onFilterPress,
  onFocusInput,
  autoFocus,
  onSubmitEditing,
  iconType = "filter", // Default to filter icon for backward compatibility
}: SearchBarProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false); // ← NEW: tracks focus

  const handleSearch = (value: string) => {
    setText(value);
    onSearch?.(value);
  };

  return (
    <View
      className={`
        flex-row items-center 
        bg-white
        rounded-[15px] ps-[20px] pe-[10px] py-[13px] h-[64px]
        border border-transparent
        transition-all duration-200
        ${
          isFocused
            ? "border-primary shadow-xl shadow-primary/20" // ← Whole bar highlights
            : "shadow-[0px_3px_12px_0px_#0000001A]"
        }
      `}
    >
      {/* Input */}
      <TextInput
        placeholder={placeholder}
        onChangeText={handleSearch}
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-base text-dark-blue"
        onFocus={() => {
          setIsFocused(true);
          onFocusInput?.();
        }}
        onBlur={() => setIsFocused(false)}
        style={{ outline: "none" }}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
      />

      {/* Action Button */}
      <TouchableOpacity
        onPress={onFilterPress}
        className="ml-[10px] bg-primary w-[38px] h-[38px] rounded-[10px] items-center justify-center active:opacity-80"
      >
        {iconType === "search" ? (
          <SearchIcon width={16} height={16} />
        ) : (
          <SlidersHorizontal size={16} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}
