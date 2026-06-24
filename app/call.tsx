import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { PhoneOff, Mic, MicOff, Volume2 } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

export default function CallScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "connecting" | "ringing" | "connected" | "ended"
  >("connecting");
  const [isIncoming] = useState((params.isIncoming as string) === "true");

  const contactName = (params.contactName as string) || "Ronald Richards";

  // Simulate call connection process
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isIncoming) {
      setCallStatus("ringing");
    } else {
      setCallStatus("connecting");
      timeout = setTimeout(() => {
        setCallStatus("ringing");
        setTimeout(() => {
          setCallStatus("connected");
        }, 2000);
      }, 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isIncoming]);

  // Call timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (callStatus === "connected") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get status text
  const getStatusText = () => {
    switch (callStatus) {
      case "connecting":
        return "Connecting...";
      case "ringing":
        return isIncoming ? "Incoming call..." : "Ringing...";
      case "connected":
        return formatDuration(callDuration);
      case "ended":
        return "Call ended";
      default:
        return "";
    }
  };

  // Handle end call
  const handleEndCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  // Handle answer call (for incoming calls)
  const handleAnswerCall = () => {
    setCallStatus("connected");
  };

  // Handle decline call (for incoming calls)
  const handleDeclineCall = () => {
    handleEndCall();
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <StatusBar barStyle="dark-content" backgroundColor="#F5F9FF" />
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* Header with contact info */}
        <View className="flex-1 items-center justify-center px-8">
          {/* Contact Avatar */}
          <View className="w-40 h-40 rounded-full bg-white border-4 border-[#E8F1FF] items-center justify-center mb-8 shadow-[0px_4px_16px_0px_#00000014]">
            <Text className="text-5xl font-jost-bold text-dark-blue">
              {contactName.charAt(0).toUpperCase()}
            </Text>
          </View>

          {/* Contact Name */}
          <Text className="text-dark-blue text-3xl font-jost-semibold mb-3 text-center">
            {contactName}
          </Text>

          {/* Call Status */}
          <Text className="text-[#A0A4AB] text-lg font-mulish-medium mb-12">
            {getStatusText()}
          </Text>

          {/* Connection status indicator */}
          {callStatus === "connecting" && (
            <View className="flex-row items-center mb-12">
              <View className="w-3 h-3 bg-primary rounded-full animate-pulse mr-2" />
              <View
                className="w-3 h-3 bg-primary rounded-full animate-pulse mr-2"
                style={{ animationDelay: "0.2s" }}
              />
              <View
                className="w-3 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </View>
          )}
        </View>

        {/* Call Controls */}
        <View className="px-8 pb-12">
          {/* Secondary Controls (when call is connected) */}
          {callStatus === "connected" && (
            <View className="flex-row justify-center items-center mb-12 gap-12">
              {/* Mute Button */}
              <TouchableOpacity
                onPress={() => setIsMuted(!isMuted)}
                activeOpacity={0.7}
                className={`w-16 h-16 rounded-full items-center justify-center ${
                  isMuted ? "bg-red-500" : "bg-[#E8F1FF]"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              >
                {isMuted ? (
                  <MicOff size={24} color="white" />
                ) : (
                  <Mic size={24} color="#0B1354" />
                )}
              </TouchableOpacity>

              {/* Speaker Button */}
              <TouchableOpacity
                onPress={() => setIsSpeaker(!isSpeaker)}
                activeOpacity={0.7}
                className={`w-16 h-16 rounded-full items-center justify-center ${
                  isSpeaker ? "bg-primary" : "bg-[#E8F1FF]"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              >
                <Volume2 size={24} color={isSpeaker ? "white" : "#0B1354"} />
              </TouchableOpacity>
            </View>
          )}

          {/* Primary Controls */}
          <View className="flex-row justify-center items-center">
            {isIncoming && callStatus === "ringing" ? (
              // Incoming call controls
              <View className="flex-row gap-20">
                {/* Decline Button */}
                <TouchableOpacity
                  onPress={handleDeclineCall}
                  activeOpacity={0.7}
                  className="w-20 h-20 rounded-full bg-red-500 items-center justify-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <PhoneOff size={28} color="white" />
                </TouchableOpacity>

                {/* Answer Button */}
                <TouchableOpacity
                  onPress={handleAnswerCall}
                  activeOpacity={0.7}
                  className="w-20 h-20 rounded-full bg-[#167F71] items-center justify-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <PhoneOff
                    size={28}
                    color="white"
                    style={{ transform: [{ rotate: "135deg" }] }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              // End call button (for outgoing calls or connected calls)
              <TouchableOpacity
                onPress={handleEndCall}
                activeOpacity={0.7}
                className="w-20 h-20 rounded-full bg-red-500 items-center justify-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <PhoneOff size={28} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
