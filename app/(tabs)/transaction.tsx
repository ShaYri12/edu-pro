import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Calendar, Filter } from 'lucide-react-native';

export default function TransactionScreen() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Income' | 'Expense'>('All');

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
            Transactions
          </Text>
          <Text className="text-[14px] text-light-gray mt-1">
            Your payment history
          </Text>
        </View>

        {/* Balance Card */}
        <View className="bg-primary rounded-2xl p-6 mb-6 shadow-[0_4px_10px_0_#00000014]">
          <Text className="text-white/80 text-[14px] mb-2">Total Balance</Text>
          <Text className="text-white text-[32px] font-jost-semibold mb-4">₹2,450</Text>
          
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white/80 text-[12px]">This Month</Text>
              <Text className="text-white text-[16px] font-jost-semibold">₹850</Text>
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-white/20 rounded-full px-4 py-2"
            >
              <Text className="text-white font-jost-semibold text-[14px]">Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row bg-white rounded-2xl p-1 mb-6 shadow-[0_4px_10px_0_#00000014]">
          {(['All', 'Income', 'Expense'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
              className={`flex-1 py-3 rounded-xl items-center ${
                activeFilter === filter ? 'bg-primary' : 'bg-transparent'
              }`}
            >
              <Text className={`font-jost-semibold ${
                activeFilter === filter ? 'text-white' : 'text-dark-blue'
              }`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction List */}
        <View className="gap-3">
          {/* Course Purchase */}
          <View className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-[44px] h-[44px] rounded-full bg-[#FF6B6B]/10 items-center justify-center">
                  <ArrowUpRight size={20} color="#FF6B6B" />
                </View>
                <View>
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Graphic Design Course
                  </Text>
                  <Text className="text-[12px] text-light-gray">Course Purchase</Text>
                  <Text className="text-[11px] text-light-gray">Dec 15, 2024</Text>
                </View>
              </View>
              <Text className="text-[16px] font-jost-semibold text-[#FF6B6B]">
                -₹499
              </Text>
            </View>
          </View>

          {/* Refund */}
          <View className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-[44px] h-[44px] rounded-full bg-[#0FB77A]/10 items-center justify-center">
                  <ArrowDownLeft size={20} color="#0FB77A" />
                </View>
                <View>
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Course Refund
                  </Text>
                  <Text className="text-[12px] text-light-gray">Refund Processed</Text>
                  <Text className="text-[11px] text-light-gray">Dec 12, 2024</Text>
                </View>
              </View>
              <Text className="text-[16px] font-jost-semibold text-[#0FB77A]">
                +₹350
              </Text>
            </View>
          </View>

          {/* Web Development Course */}
          <View className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-[44px] h-[44px] rounded-full bg-[#FF6B6B]/10 items-center justify-center">
                  <ArrowUpRight size={20} color="#FF6B6B" />
                </View>
                <View>
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Web Development Course
                  </Text>
                  <Text className="text-[12px] text-light-gray">Course Purchase</Text>
                  <Text className="text-[11px] text-light-gray">Dec 10, 2024</Text>
                </View>
              </View>
              <Text className="text-[16px] font-jost-semibold text-[#FF6B6B]">
                -₹200
              </Text>
            </View>
          </View>

          {/* Wallet Top-up */}
          <View className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-[44px] h-[44px] rounded-full bg-[#0FB77A]/10 items-center justify-center">
                  <ArrowDownLeft size={20} color="#0FB77A" />
                </View>
                <View>
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    Wallet Top-up
                  </Text>
                  <Text className="text-[12px] text-light-gray">Money Added</Text>
                  <Text className="text-[11px] text-light-gray">Dec 8, 2024</Text>
                </View>
              </View>
              <Text className="text-[16px] font-jost-semibold text-[#0FB77A]">
                +₹1,000
              </Text>
            </View>
          </View>

          {/* 3D Modeling Course */}
          <View className="bg-white rounded-2xl p-4 shadow-[0_4px_10px_0_#00000014]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-[44px] h-[44px] rounded-full bg-[#FF6B6B]/10 items-center justify-center">
                  <ArrowUpRight size={20} color="#FF6B6B" />
                </View>
                <View>
                  <Text className="text-[15px] font-jost-semibold text-dark-blue">
                    3D Modeling Basics
                  </Text>
                  <Text className="text-[12px] text-light-gray">Course Purchase</Text>
                  <Text className="text-[11px] text-light-gray">Dec 5, 2024</Text>
                </View>
              </View>
              <Text className="text-[16px] font-jost-semibold text-[#FF6B6B]">
                -₹350
              </Text>
            </View>
          </View>
        </View>

        {/* Empty State (when no transactions) */}
        {/* 
        <View className="items-center py-12">
          <CreditCard size={64} color="#E5E7EB" />
          <Text className="text-[18px] font-jost-semibold text-dark-blue mt-4">
            No Transactions
          </Text>
          <Text className="text-[14px] text-light-gray text-center mt-2 px-8">
            Your transaction history will appear here
          </Text>
        </View>
        */}
      </ScrollView>
    </SafeAreaView>
  );
}