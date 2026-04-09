import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { 
  Settings, 
  BookOpen, 
  Award, 
  Heart, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Edit3,
  Bell,
  Shield,
  CreditCard
} from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <ScrollView 
        className="flex-1 px-6 pt-12"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mb-8">
          <Text className="text-[28px] font-jost-semibold text-dark-blue">
            Profile
          </Text>
          <Text className="text-[14px] text-light-gray mt-1">
            Manage your account and preferences
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-[0_4px_10px_0_#00000014]">
          <View className="flex-row items-center gap-4">
            <View className="w-[80px] h-[80px] rounded-full bg-primary items-center justify-center">
              <Text className="text-white text-[28px] font-jost-semibold">JD</Text>
            </View>
            
            <View className="flex-1">
              <Text className="text-[20px] font-jost-semibold text-dark-blue">
                John Doe
              </Text>
              <Text className="text-[14px] text-light-gray mb-2">
                john.doe@example.com
              </Text>
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-1">
                  <BookOpen size={14} color="#0961F5" />
                  <Text className="text-[12px] text-primary font-mulish-extrabold">
                    3 Courses
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Award size={14} color="#FAC025" />
                  <Text className="text-[12px] text-[#FAC025] font-mulish-extrabold">
                    2 Certificates
                  </Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity activeOpacity={0.7}>
              <Edit3 size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <Text className="text-[24px] font-jost-semibold text-dark-blue">12</Text>
            <Text className="text-[12px] text-light-gray">Hours Learned</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <Text className="text-[24px] font-jost-semibold text-dark-blue">85%</Text>
            <Text className="text-[12px] text-light-gray">Avg Progress</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <Text className="text-[24px] font-jost-semibold text-dark-blue">7</Text>
            <Text className="text-[12px] text-light-gray">Day Streak</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white rounded-2xl shadow-[0_4px_10px_0_#00000014] mb-6">
          {/* Account Settings */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-4 border-b border-[#E5E7EB]"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-[40px] h-[40px] rounded-full bg-[#E8F1FF] items-center justify-center">
                <Settings size={18} color="#0961F5" />
              </View>
              <Text className="text-[15px] font-jost-semibold text-dark-blue">
                Account Settings
              </Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-4 border-b border-[#E5E7EB]"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-[40px] h-[40px] rounded-full bg-[#FFF3E0] items-center justify-center">
                <Bell size={18} color="#FAC025" />
              </View>
              <Text className="text-[15px] font-jost-semibold text-dark-blue">
                Notifications
              </Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Payment Methods */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-4 border-b border-[#E5E7EB]"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-[40px] h-[40px] rounded-full bg-[#E8F5E8] items-center justify-center">
                <CreditCard size={18} color="#0FB77A" />
              </View>
              <Text className="text-[15px] font-jost-semibold text-dark-blue">
                Payment Methods
              </Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Privacy & Security */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-4 border-b border-[#E5E7EB]"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-[40px] h-[40px] rounded-full bg-[#F3E8FF] items-center justify-center">
                <Shield size={18} color="#8B5CF6" />
              </View>
              <Text className="text-[15px] font-jost-semibold text-dark-blue">
                Privacy & Security
              </Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Wishlist */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-4 border-b border-[#E5E7EB]"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-[40px] h-[40px] rounded-full bg-[#FFE8E8] items-center justify-center">
                <Heart size={18} color="#FF6B6B" />
              </View>
              <Text className="text-[15px] font-jost-semibold text-dark-blue">
                Wishlist
              </Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-[40px] h-[40px] rounded-full bg-[#E0F2FE] items-center justify-center">
                <HelpCircle size={18} color="#0891B2" />
              </View>
              <Text className="text-[15px] font-jost-semibold text-dark-blue">
                Help & Support
              </Text>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]"
        >
          <View className="flex-row items-center justify-center gap-3">
            <LogOut size={18} color="#FF6B6B" />
            <Text className="text-[15px] font-jost-semibold text-[#FF6B6B]">
              Logout
            </Text>
          </View>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-center text-[12px] text-light-gray mt-6">
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}