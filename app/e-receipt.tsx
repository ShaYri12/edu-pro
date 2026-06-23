import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  ArrowLeft,
  MoreHorizontal,
  Copy,
  Send,
  Download,
  Printer,
  Check,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

interface DropdownItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  action: () => void;
}

export default function EReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const insets = useSafeAreaInsets();

  // Get data from params or use mock data
  const transactionData = {
    id: (params.transactionId as string) || "1",
    title: (params.title as string) || "3d Character Illustration Cre..",
    category: (params.category as string) || "Web Development",
    status: (params.status as string) || "Paid",
  };

  // Mock receipt data - in real app this would come from API
  const receiptData = {
    transactionId: "SK345680976",
    name: "Alex",
    email: "alexreall@gmail.com",
    course: transactionData.title,
    category: transactionData.category,
    price: "799/-",
    date: "Nov 20, 2023",
    time: "15:45",
    status: transactionData.status,
  };

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(receiptData.transactionId);
      setIsCopied(true);

      // Show success feedback and reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      // Optional: Keep the alert for additional feedback
      Alert.alert("Copied!", "Transaction ID copied to clipboard", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to copy to clipboard");
    }
  };

  const handleShare = async () => {
    try {
      if (await Sharing.isAvailableAsync()) {
        // Create a temporary text file to share
        const html = `
          <html>
            <body style="font-family: Arial; padding: 20px;">
              <h2>E-Receipt</h2>
              <p><strong>Transaction ID:</strong> ${receiptData.transactionId}</p>
              <p><strong>Name:</strong> ${receiptData.name}</p>
              <p><strong>Email:</strong> ${receiptData.email}</p>
              <p><strong>Course:</strong> ${receiptData.course}</p>
              <p><strong>Category:</strong> ${receiptData.category}</p>
              <p><strong>Price:</strong> ${receiptData.price}</p>
              <p><strong>Date:</strong> ${receiptData.date} / ${receiptData.time}</p>
              <p><strong>Status:</strong> ${receiptData.status}</p>
            </body>
          </html>
        `;

        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
      }
    } catch (error) {
      Alert.alert("Error", "Unable to share receipt");
    }
    setShowDropdown(false);
  };

  const handleDownload = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 20px;">
            <h2>E-Receipt</h2>
            <p><strong>Transaction ID:</strong> ${receiptData.transactionId}</p>
            <p><strong>Name:</strong> ${receiptData.name}</p>
            <p><strong>Email:</strong> ${receiptData.email}</p>
            <p><strong>Course:</strong> ${receiptData.course}</p>
            <p><strong>Category:</strong> ${receiptData.category}</p>
            <p><strong>Price:</strong> ${receiptData.price}</p>
            <p><strong>Date:</strong> ${receiptData.date} / ${receiptData.time}</p>
            <p><strong>Status:</strong> ${receiptData.status}</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Unable to download receipt");
    }
    setShowDropdown(false);
  };

  const handlePrint = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 20px;">
            <h2>E-Receipt</h2>
            <p><strong>Transaction ID:</strong> ${receiptData.transactionId}</p>
            <p><strong>Name:</strong> ${receiptData.name}</p>
            <p><strong>Email:</strong> ${receiptData.email}</p>
            <p><strong>Course:</strong> ${receiptData.course}</p>
            <p><strong>Category:</strong> ${receiptData.category}</p>
            <p><strong>Price:</strong> ${receiptData.price}</p>
            <p><strong>Date:</strong> ${receiptData.date} / ${receiptData.time}</p>
            <p><strong>Status:</strong> ${receiptData.status}</p>
          </body>
        </html>
      `;

      await Print.printAsync({ html });
    } catch (error) {
      Alert.alert("Error", "Unable to print receipt");
    }
    setShowDropdown(false);
  };

  const dropdownItems: DropdownItem[] = [
    { id: "share", label: "Share", icon: Send, action: handleShare },
    {
      id: "download",
      label: "Download",
      icon: Download,
      action: handleDownload,
    },
    { id: "print", label: "Print", icon: Printer, action: handlePrint },
  ];

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header - Fixed at top */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <ArrowLeft size={24} color="#0B1354" />
              </TouchableOpacity>
              <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">
                E-Receipt
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowDropdown(!showDropdown)}
              activeOpacity={0.7}
              className="w-6 h-6 bg-[#E8F1FF] rounded-full items-center justify-center border border-[#B4BDC480]"
            >
              <MoreHorizontal size={15} color="#1D1D1B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom + 20, 40),
          }}
        >
          {/* Receipt Content */}
          <View className="items-center">
            {/* Receipt Icon */}
            <View style={{ marginBottom: 30 }}>
              <Image
                source={require("../assets/images/receipt.png")}
                style={{
                  width: 101,
                  height: 100,
                  resizeMode: "contain",
                }}
              />
            </View>

            {/* Barcode Placeholder */}
            <Image
              source={require("../assets/images/barcode.png")}
              style={{
                width: 270,
                height: 103,
                resizeMode: "contain",
              }}
            />

            {/* Receipt Details */}
            <View className="w-full flex gap-3" style={{ marginTop: 34 }}>
              <DetailRow label="Name" value={receiptData.name} />
              <DetailRow label="Email ID" value={receiptData.email} />
              <DetailRow label="Course" value={receiptData.course} />
              <DetailRow label="Category" value={receiptData.category} />

              {/* Transaction ID with Copy Button */}
              <View className="flex-row justify-between items-center mt-6">
                <Text className="text-[16px] font-mulish-semibold text-dark-blue">
                  TransactionID
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[14px] font-mulish-bold text-[#545454] mr-2">
                    {receiptData.transactionId}
                  </Text>
                  <TouchableOpacity
                    onPress={copyToClipboard}
                    activeOpacity={0.7}
                  >
                    {isCopied ? (
                      <Check size={14} color="#202244" />
                    ) : (
                      <Copy size={14} color="#202244" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <DetailRow label="Price" value={receiptData.price} />
              <DetailRow
                label="Date"
                value={`${receiptData.date} ${"  "}/ ${" "} ${receiptData.time}`}
              />

              {/* Status */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[15px] font-jost-semibold text-dark-blue">
                  Status
                </Text>
                <View className="bg-secondary px-4 py-1">
                  <Text className="text-white font-mulish-bold text-[12px]">
                    {receiptData.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Background extension */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-[#F5F9FF]"
          style={{ height: Math.max(insets.bottom, 20), zIndex: -1 }}
        />
      </SafeAreaView>

      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View className="flex-1">
            <View
              style={{ top: 60 }}
              className="absolute right-6 bg-white rounded-lg shadow-[0px_2px_8px_0px_#0000001A] py-4 min-w-[140px]"
            >
              {dropdownItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={item.action}
                    className={`px-4 py-2 flex-row items-center text-right gap-3 ${index < dropdownItems.length - 1 ? "border-b border-gray-50" : ""}`}
                    style={{ justifyContent: "flex-end" }}
                    activeOpacity={0.7}
                  >
                    <Text className="text-[#545454] font-mulish-semibold text-[14px]">
                      {item.label}
                    </Text>
                    <IconComponent size={16} color="#1D1D1B" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center">
    <Text className="text-[15px] font-jost-semibold text-dark-blue">
      {label}
    </Text>
    <Text className="text-[14px] font-jost-regular text-[#545454] flex-1 text-right">
      {value}
    </Text>
  </View>
);
