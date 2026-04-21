import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Clock, CheckCircle } from 'lucide-react-native';

export default function InboxScreen() {
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
            Inbox
          </Text>
          <Text className="text-[14px] text-light-gray mt-1">
            Messages and notifications
          </Text>
        </View>

        {/* Message List */}
        <View className="gap-3">
          {/* Message 1 */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]"
          >
            <View className="flex-row items-start gap-3">
              <View className="w-[44px] h-[44px] rounded-full bg-primary items-center justify-center">
                <Text className="text-white font-jost-semibold text-[16px]">RJ</Text>
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Robert Jr
                  </Text>
                  <Text className="text-[12px] text-light-gray">2h ago</Text>
                </View>
                
                <Text className="text-[13px] text-light-gray mb-2">
                  Great progress on your design assignment! Keep up the excellent work.
                </Text>
                
                <View className="flex-row items-center gap-1">
                  <CheckCircle size={12} color="#0FB77A" />
                  <Text className="text-[11px] text-[#0FB77A]">Read</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Message 2 */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]"
          >
            <View className="flex-row items-start gap-3">
              <View className="w-[44px] h-[44px] rounded-full bg-[#FF6B6B] items-center justify-center">
                <Text className="text-white font-jost-semibold text-[16px]">EB</Text>
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Elena Brooks
                  </Text>
                  <Text className="text-[12px] text-light-gray">1d ago</Text>
                </View>
                
                <Text className="text-[13px] text-light-gray mb-2">
                  New assignment uploaded for Advertisement Design course.
                </Text>
                
                <View className="flex-row items-center gap-1">
                  <MessageCircle size={12} color="#0961F5" />
                  <Text className="text-[11px] text-primary">Unread</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* System Notification */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]"
          >
            <View className="flex-row items-start gap-3">
              <View className="w-[44px] h-[44px] rounded-full bg-[#FAC025] items-center justify-center">
                <Text className="text-white font-jost-semibold text-[16px]">📚</Text>
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Course Reminder
                  </Text>
                  <Text className="text-[12px] text-light-gray">2d ago</Text>
                </View>
                
                <Text className="text-[13px] text-light-gray mb-2">
                  Don't forget to complete your Web Development lesson today!
                </Text>
                
                <View className="flex-row items-center gap-1">
                  <Clock size={12} color="#FAC025" />
                  <Text className="text-[11px] text-[#FAC025]">Reminder</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Achievement Notification */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]"
          >
            <View className="flex-row items-start gap-3">
              <View className="w-[44px] h-[44px] rounded-full bg-[#0FB77A] items-center justify-center">
                <Text className="text-white font-jost-semibold text-[16px]">🏆</Text>
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Achievement Unlocked!
                  </Text>
                  <Text className="text-[12px] text-light-gray">3d ago</Text>
                </View>
                
                <Text className="text-[13px] text-light-gray mb-2">
                  Congratulations! You've completed 5 lessons this week.
                </Text>
                
                <View className="flex-row items-center gap-1">
                  <CheckCircle size={12} color="#0FB77A" />
                  <Text className="text-[11px] text-[#0FB77A]">Achievement</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Empty State (when no messages) */}
        {/* 
        <View className="items-center py-12">
          <MessageCircle size={64} color="#E5E7EB" />
          <Text className="text-[18px] font-jost-semibold text-dark-blue mt-4">
            No Messages
          </Text>
          <Text className="text-[14px] text-light-gray text-center mt-2 px-8">
            Your messages and notifications will appear here
          </Text>
        </View>
        */}
      </ScrollView>
    </SafeAreaView>
  );
}