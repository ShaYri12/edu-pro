import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAppStateBackground } from "../hooks/useAppStateBackground";

// Import SVG icons
import ThreeDDesignIcon from "@/assets/icons/3d-design.svg";
import GraphicDesignIcon from "@/assets/icons/graphic-design.svg";
import WebDevelopmentIcon from "@/assets/icons/web-development.svg";
import SeoMarketingIcon from "@/assets/icons/seo-marketing.svg";
import FinanceAccountingIcon from "@/assets/icons/finance-accounting.svg";
import PersonalDevelopmentIcon from "@/assets/icons/personal-development.svg";
import OfficeProductivityIcon from "@/assets/icons/office-productivity.svg";
import HrManagementIcon from "@/assets/icons/hr-management.svg";

const { width } = Dimensions.get("window");
const itemWidth = (width - 48 - 32) / 2; // padding (48) + gap (32) divided by 2 columns

const CATEGORIES = [
  { label: "3D Design", icon: ThreeDDesignIcon },
  { label: "Graphic Design", icon: GraphicDesignIcon },
  { label: "Web Development", icon: WebDevelopmentIcon },
  { label: "SEO & Marketing", icon: SeoMarketingIcon },
  { label: "Finance & Accounting", icon: FinanceAccountingIcon },
  { label: "Personal Development", icon: PersonalDevelopmentIcon },
  { label: "Office Productivity", icon: OfficeProductivityIcon },
  { label: "HR Management", icon: HrManagementIcon },
];

interface AllCategoriesProps {
  onBack?: () => void;
}

export default function AllCategories({ onBack }: AllCategoriesProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const backgroundKey = useAppStateBackground();
  
  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <View className="flex-1 bg-[#F5F9FF]">
        <SafeAreaView className="flex-1" edges={["top"]}>
          <ScrollView
            className="px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 40), paddingTop: 24 }}
          >
        {/* Header */}
        <View className="flex-row items-center mb-[30px]">
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft size={24} color="#0B1354" />
          </TouchableOpacity>
          <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
            All Category
          </Text>
        </View>

        {/* SearchBar */}
        <SearchBar onFocusInput={() => router.push("/search")} />

        {/* 2-Column Grid */}
        <View className="mt-[57px]">
          <View className="flex-row flex-wrap justify-between">
            {CATEGORIES.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  className="items-center mb-14 active:opacity-80"
                  style={{ width: itemWidth }}
                >
                  <IconComponent width={40} height={40} />
                  <Text className="mt-[7px] text-center text-dark-blue text-sm opacity-80 font-mulish-medium">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
    </View>
  );
}
