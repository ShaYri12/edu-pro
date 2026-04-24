import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ArrowLeft, Moon, ChevronRight, ImageIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import ProfileIcon from "../../components/SVGs/Profile";
import TransactionIcon from "../../components/SVGs/Transaction";
import NotificationIcon from "../../components/SVGs/Notification";
import SecurityIcon from "@/assets/icons/security.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import HelpIcon from "@/assets/icons/help.svg";
import InviteIcon from "@/assets/icons/invite.svg";
import TermsIcon from "@/assets/icons/terms.svg";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      id: 1,
      title: "Edit Profile",
      icon: ProfileIcon,
      isComponent: true,
    },
    {
      id: 2,
      title: "Payment Option",
      icon: TransactionIcon,
      isComponent: true,
    },
    {
      id: 3,
      title: "Notifications",
      icon: NotificationIcon,
      isComponent: true,
    },
    {
      id: 4,
      title: "Security",
      icon: SecurityIcon,
      isComponent: false,
    },
    {
      id: 5,
      title: "Dark Mode",
      icon: EyeIcon,
      isComponent: true,
    },
    {
      id: 6,
      title: "Terms & Conditions",
      icon: TermsIcon,
      isComponent: false,
    },
    {
      id: 7,
      title: "Help Center",
      icon: HelpIcon,
      isComponent: false,
    },
    {
      id: 8,
      title: "Intive Friends",
      icon: InviteIcon,
      isComponent: false,
    },
  ];

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1 py-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom + 20, 40),
          }}
        >
          {/* Header */}
          <View className="flex-row items-center mb-[18px] px-4">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <ArrowLeft size={24} color="#0B1354" />
            </TouchableOpacity>
            <Text className="ml-3 text-dark-blue font-jost-semibold text-[20px]">
              Profile
            </Text>
          </View>

          {/* Profile Picture - Outside the card */}
          <View className="items-center mb-[-70px] z-10">
            <View className="relative">
              <View className="w-[110px] h-[110px] rounded-full bg-[#D8D8D8] border-[4px] border-secondary items-center justify-center">
                {/* Placeholder for profile image */}
              </View>

              {/* Image/Gallery Icon */}
              <View className="absolute bottom-[-4px] right-2 w-[36px] h-[36px] bg-white rounded-[8px] border-[3px] border-secondary items-center justify-center">
                <ImageIcon size={20} color="#167F71" />
              </View>
            </View>
          </View>

          {/* Main Card Container */}
          <View style={{paddingTop: 80}} className="bg-white rounded-3xl mx-4 pb-6 px-6 shadow-[0_4px_20px_0_#00000010]">
            {/* User Info */}
            <View className="items-center mb-4">
              <Text className="text-[24px] font-jost-semibold text-dark-blue mb-1">
                Alex
              </Text>
              <Text className="text-[13px] text-[#545454]">
                hernandex.redial@gmail.ac.in
              </Text>
            </View>

            {/* Menu Items */}
            <View>
              {menuItems.map((item, index) => (
                <View key={item.id}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-row items-center justify-between py-4"
                  >
                    <View className="flex-row items-center gap-3">
                      {item.isComponent ? (
                        <item.icon size={23} color="#202244" />
                      ) : (
                        <item.icon width={23} height={23} />
                      )}
                      <Text className="text-[15px] text-dark-blue">
                        {item.title}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                      <ChevronRight size={22} color="#1D1D1B" />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
