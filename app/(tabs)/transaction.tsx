import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ArrowLeft, Search, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";

export default function TransactionScreen() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  const transactions = [
    {
      id: 1,
      title: "Build Personal Branding",
      category: "Web Designer",
      status: "Paid",
      image: require("../../assets/images/graphic-design.jpg"),
    },
    {
      id: 2,
      title: "Mastering Blender 3D",
      category: "UI/UX Designer",
      status: "Paid",
      image: require("../../assets/images/3d-design.jpg"),
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      category: "Web Development",
      status: "Paid",
      image: require("../../assets/images/web-development.jpg"),
    },
    {
      id: 4,
      title: "Complete UI Designer",
      category: "HR Management",
      status: "Paid",
      image: require("../../assets/images/hr-management.jpg"),
    },
    {
      id: 5,
      title: "Sharing Work with Team",
      category: "Finance & Accounting",
      status: "Paid",
      image: require("../../assets/images/seo-marketing.jpeg"),
    },
  ];

  // Filter transactions based on search query
  const filteredTransactions = searchQuery.trim()
    ? transactions.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions;

  const handleSearchPress = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery(""); // Clear search when closing
    }
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1 px-8 py-8"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom + 20, 40),
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-[20px]">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <ArrowLeft size={24} color="#0B1354" />
              </TouchableOpacity>
              <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
                Transactions
              </Text>
            </View>

            <TouchableOpacity onPress={handleSearchPress} activeOpacity={0.7}>
              {showSearch ? (
                <X size={24} color="#0B1354" />
              ) : (
                <Search size={24} color="#0B1354" />
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar - Conditionally shown */}
          {showSearch && (
            <View className="mb-5">
              <SearchBar
                placeholder="Search transactions..."
                iconType="search"
                onSearch={(text) => {
                  setSearchQuery(text);
                }}
              />
            </View>
          )}

          {/* Transaction List */}
          <View>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <View key={transaction.id}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-row items-start gap-4 py-5"
                  >
                    {/* Transaction Image */}
                    <View className="w-[92px] h-[92px] rounded-[18px] overflow-hidden">
                      <Image
                        source={transaction.image}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </View>

                    {/* Transaction Info */}
                    <View className="flex-1">
                      <Text
                        className="text-[18px] font-jost-semibold text-dark-blue mb-1"
                        numberOfLines={2}
                      >
                        {transaction.title}
                      </Text>
                      <Text className="text-[14px] text-[#545454] mb-3">
                        {transaction.category}
                      </Text>

                      <View className="bg-secondary px-3 py-1 rounded self-start">
                        <Text className="text-white font-mulish-extrabold text-[12px]">
                          {transaction.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Divider - Don't show after last item */}
                  {index < filteredTransactions.length - 1 && (
                    <View className="h-[1px] bg-[#E5E7EB]" />
                  )}
                </View>
              ))
            ) : (
              <View className="items-center py-12">
                <Text className="text-[18px] font-jost-semibold text-dark-blue">
                  No transactions found
                </Text>
                <Text className="text-[14px] text-light-gray text-center mt-2">
                  Try searching with different keywords
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Background extension */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-[#F5F9FF]"
          style={{ height: Math.max(insets.bottom, 20), zIndex: -1 }}
        />
      </SafeAreaView>
    </View>
  );
}
