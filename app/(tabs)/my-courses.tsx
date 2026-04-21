import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book, Clock, Star } from 'lucide-react-native';

export default function MyCoursesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F5F9FF]" edges={['top']}>
      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="mb-8">
          <Text className="text-[28px] font-jost-semibold text-dark-blue">
            My Courses
          </Text>
          <Text className="text-[14px] text-light-gray mt-1">
            Continue your learning journey
          </Text>
        </View>

        {/* Course Progress Cards */}
        <View className="gap-4">
          {/* Sample Course 1 */}
          <View className="bg-white rounded-2xl p-5 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xs text-destructive">Graphic Design</Text>
              <Text className="text-primary text-[12px] font-mulish-extrabold">65% Complete</Text>
            </View>
            
            <Text className="text-[16px] font-jost-semibold text-dark-blue mb-2">
              Graphic Design Advanced
            </Text>
            
            <View className="flex-row items-center gap-4 mb-3">
              <View className="flex-row items-center gap-1">
                <Book size={14} color="#6B7280" />
                <Text className="text-[12px] text-light-gray">25 Lessons</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Clock size={14} color="#6B7280" />
                <Text className="text-[12px] text-light-gray">42 Hours</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="h-2 bg-[#E5E7EB] rounded-full mb-4">
              <View className="h-2 bg-primary rounded-full" style={{ width: '65%' }} />
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-primary rounded-full py-3 items-center"
            >
              <Text className="text-white font-jost-semibold">Continue Learning</Text>
            </TouchableOpacity>
          </View>

          {/* Sample Course 2 */}
          <View className="bg-white rounded-2xl p-5 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xs text-destructive">Web Development</Text>
              <Text className="text-primary text-[12px] font-mulish-extrabold">30% Complete</Text>
            </View>
            
            <Text className="text-[16px] font-jost-semibold text-dark-blue mb-2">
              Web Developer Bootcamp
            </Text>
            
            <View className="flex-row items-center gap-4 mb-3">
              <View className="flex-row items-center gap-1">
                <Book size={14} color="#6B7280" />
                <Text className="text-[12px] text-light-gray">40 Lessons</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Clock size={14} color="#6B7280" />
                <Text className="text-[12px] text-light-gray">60 Hours</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="h-2 bg-[#E5E7EB] rounded-full mb-4">
              <View className="h-2 bg-primary rounded-full" style={{ width: '30%' }} />
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-primary rounded-full py-3 items-center"
            >
              <Text className="text-white font-jost-semibold">Continue Learning</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Empty State (when no courses) */}
        {/* 
        <View className="items-center py-12">
          <Book size={64} color="#E5E7EB" />
          <Text className="text-[18px] font-jost-semibold text-dark-blue mt-4">
            No Courses Yet
          </Text>
          <Text className="text-[14px] text-light-gray text-center mt-2 px-8">
            Start learning by enrolling in your first course
          </Text>
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-primary rounded-full px-6 py-3 mt-6"
          >
            <Text className="text-white font-jost-semibold">Browse Courses</Text>
          </TouchableOpacity>
        </View>
        */}
      </ScrollView>
    </SafeAreaView>
  );
}