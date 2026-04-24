import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ArrowLeft, Search, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";

// Import SVG icons
import IncomingIcon from "@/assets/icons/incoming.svg";
import OutgoingIcon from "@/assets/icons/outgoing.svg";
import MissedIcon from "@/assets/icons/missed.svg";
import CallIcon from "@/assets/icons/call.svg";

export default function InboxScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"Chat" | "Calls">("Chat");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  const chatData = [
    {
      id: 1,
      name: "Natasha",
      message: "Hi, Good Evening Bro.!",
      time: "14:59",
      unreadCount: 3,
    },
    {
      id: 2,
      name: "Alex",
      message: "I Just Finished It.!",
      time: "06:35",
      unreadCount: 2,
    },
    {
      id: 3,
      name: "John",
      message: "How are you?",
      time: "08:10",
      unreadCount: 0,
    },
    {
      id: 4,
      name: "Mia",
      message: "OMG, This is Amazing..",
      time: "21:07",
      unreadCount: 5,
    },
    {
      id: 5,
      name: "Maria",
      message: "Wow, This is Really Epic",
      time: "09:15",
      unreadCount: 0,
    },
    {
      id: 6,
      name: "Tiya",
      message: "Hi, Good Evening Bro.!",
      time: "14:59",
      unreadCount: 3,
    },
    {
      id: 7,
      name: "Manisha",
      message: "I Just Finished It.!",
      time: "06:35",
      unreadCount: 2,
    },
  ];

  const callsData = [
    {
      id: 1,
      name: "Johan",
      type: "Incoming",
      date: "Nov 03, 202X",
      status: "incoming",
    },
    {
      id: 2,
      name: "Timothee mathew",
      type: "Incoming",
      date: "Nov 05, 202X",
      status: "incoming",
    },
    {
      id: 3,
      name: "Amanriya",
      type: "Outgoing",
      date: "Nov 06, 202X",
      status: "outgoing",
    },
    {
      id: 4,
      name: "Tanisha",
      type: "Missed",
      date: "Nov 15, 202X",
      status: "missed",
    },
    {
      id: 5,
      name: "Shravya",
      type: "Outgoing",
      date: "Nov 17, 202X",
      status: "outgoing",
    },
    {
      id: 6,
      name: "Tamanha",
      type: "Missed",
      date: "Nov 18, 202X",
      status: "missed",
    },
    {
      id: 7,
      name: "Hilda M. Hernandez",
      type: "Outgoing",
      date: "Nov 19, 202X",
      status: "outgoing",
    },
  ];

  const getCallStatusIcon = (status: string) => {
    switch (status) {
      case "incoming":
        return IncomingIcon;
      case "outgoing":
        return OutgoingIcon;
      case "missed":
        return MissedIcon;
      default:
        return IncomingIcon;
    }
  };

  // Filter data based on search query
  const filteredChatData = searchQuery.trim()
    ? chatData.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatData;

  const filteredCallsData = searchQuery.trim()
    ? callsData.filter(
        (call) =>
          call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          call.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : callsData;

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
          className="flex-1 px-6 py-6"
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
                Inbox
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
                placeholder="Search conversations..."
                iconType="search"
                onSearch={(text) => {
                  setSearchQuery(text);
                }}
              />
            </View>
          )}

          {/* Tabs */}
          <View className="flex-row items-center gap-[20px] mb-6">
            <TouchableOpacity
              onPress={() => setSelectedTab("Chat")}
              activeOpacity={0.8}
              className={`${selectedTab === "Chat" ? "bg-[#167F71]" : "bg-[#E8F1FF]"} px-6 py-[14px] rounded-[24px] flex-1 text-center`}
            >
              <Text
                className={`${selectedTab === "Chat" ? "text-white" : "text-dark-blue"} font-mulish-extrabold text-center`}
              >
                Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("Calls")}
              activeOpacity={0.8}
              className={`${selectedTab === "Calls" ? "bg-[#167F71]" : "bg-[#E8F1FF]"} px-6 py-[14px] rounded-[24px] flex-1 text-center`}
            >
              <Text
                className={`${selectedTab === "Calls" ? "text-white" : "text-dark-blue"} font-mulish-extrabold text-center`}
              >
                Calls
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content - Single White Container */}
          <View className="bg-white rounded-2xl overflow-hidden shadow-[0px_4px_10px_0px_#00000014]">
            {selectedTab === "Chat" ? (
              filteredChatData.length > 0 ? (
                filteredChatData.map((chat, index) => (
                  <View key={chat.id}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="p-4 flex-row items-center"
                    >
                      {/* Avatar */}
                      <View className="w-12 h-12 bg-black rounded-full mr-4" />

                      {/* Chat Info */}
                      <View className="flex-1">
                        <Text numberOfLines={1} className="text-[16px] font-jost-semibold text-dark-blue">
                          {chat.name}
                        </Text>
                        <Text
                          className="text-[13px] text-[#545454]"
                          numberOfLines={1}
                        >
                          {chat.message}
                        </Text>
                      </View>

                      {/* Time and Badge */}
                      <View className="items-end">
                        {chat.unreadCount > 0 && (
                          <View className="bg-primary border border-[#E8F1FF] rounded-full w-6 h-6 items-center justify-center mb-1">
                            <Text className="text-white text-[11px] font-mulish-extrabold">
                              {chat.unreadCount < 10
                                ? `0${chat.unreadCount}`
                                : chat.unreadCount}
                            </Text>
                          </View>
                        )}
                        <Text className="text-[11px] text-[#545454]">
                          {chat.time}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* Divider - Don't show after last item */}
                    {index < filteredChatData.length - 1 && (
                      <View className="h-[1px] bg-[#E5E7EB]" />
                    )}
                  </View>
                ))
              ) : (
                <View className="items-center py-12">
                  <Text className="text-[18px] font-jost-semibold text-dark-blue">
                    No chats found
                  </Text>
                  <Text className="text-[14px] text-light-gray text-center mt-2">
                    Try searching with different keywords
                  </Text>
                </View>
              )
            ) : filteredCallsData.length > 0 ? (
              filteredCallsData.map((call, index) => (
                <View key={call.id}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="p-4 flex-row items-center"
                  >
                    {/* Avatar */}
                    <View className="w-[50px] h-[50px] bg-black border-2 border-[#E8F1FF] rounded-full mr-2" />

                    {/* Call Info */}
                    <View className="flex-1">
                      <Text numberOfLines={1} className="text-[16px] font-jost-semibold text-dark-blue mb-0.5">
                        {call.name}
                      </Text>
                      <View className="flex-row items-center">
                        <View className="w-[14px] h-[14px] mr-2 items-center justify-center">
                          {(() => {
                            const IconComponent = getCallStatusIcon(
                              call.status
                            );
                            return <IconComponent width={16} height={16} />;
                          })()}
                        </View>
                        <Text numberOfLines={1} className="text-[13px] text-[#545454]">
                          {call.type} | {call.date}
                        </Text>
                      </View>
                    </View>

                    {/* Call Button */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="w-[21px] h-[21px] rounded-full items-center justify-center"
                    >
                      <CallIcon width={21} height={21} />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  {/* Divider - Don't show after last item */}
                  {index < filteredCallsData.length - 1 && (
                    <View className="h-[1px] bg-[#E8F1FF]" />
                  )}
                </View>
              ))
            ) : (
              <View className="items-center py-12">
                <Text className="text-[18px] font-jost-semibold text-dark-blue">
                  No calls found
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
