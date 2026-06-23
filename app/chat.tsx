import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  ArrowLeft,
  Phone,
  Paperclip,
  Mic,
  Search,
  Send,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  type?: "text" | "media";
  images?: string[];
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(20); // Single line height
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  // Get chat data from params
  const chatName = (params.name as string) || "Unknown";
  const chatId = params.chatId as string;

  // Initialize with dummy conversation based on the design
  useEffect(() => {
    const dummyMessages: Message[] = [
      {
        id: "1",
        text: "Hi, Nicholas Good Evening 😊",
        time: "10:45",
        isOwn: false,
      },
      {
        id: "2",
        text: "How was your UI/UX Design Course Like.? 😊",
        time: "12:45",
        isOwn: false,
      },
      {
        id: "3",
        text: "Hi, Morning too Ronald",
        time: "15:29",
        isOwn: true,
      },
      {
        id: "4",
        text: "",
        time: "15:52",
        isOwn: true,
        type: "media",
        images: ["placeholder1", "placeholder2"],
      },
      {
        id: "5",
        text: "Hello, i also just finished the Sketch Basic ⭐⭐⭐⭐⭐",
        time: "15:29",
        isOwn: true,
      },
      {
        id: "6",
        text: "OMG, This is Amazing..",
        time: "13:59",
        isOwn: false,
      },
    ];
    setMessages(dummyMessages);

    // Auto scroll to bottom after messages are loaded
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      setInputHeight(20); // Reset to single line

      // Auto scroll to bottom immediately
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);

      // Simulate typing and auto-reply
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const replies = [
            "Thanks for your message! 😊",
            "That sounds great!",
            "I agree with you 💯",
            "Let me check that out 👍",
            "Awesome work! 🔥",
            "Perfect! When can we start?",
            "That's exactly what I was thinking!",
            "Amazing! Love your approach ✨",
          ];
          const randomReply =
            replies[Math.floor(Math.random() * replies.length)];

          const replyMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: randomReply,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isOwn: false,
          };

          setMessages((prev) => [...prev, replyMessage]);
          setIsTyping(false);

          // Auto scroll after reply
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }, 1500);
      }, 800);
    }
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize;
    // Always adjust height based on content size, with minimum single line height
    const newHeight = Math.max(20, Math.min(height, 100));
    setInputHeight(newHeight);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);

    // Calculate height based on line breaks and text wrapping
    const lines = text.split("\n");
    let totalLines = 0;

    lines.forEach((line) => {
      if (line === "") {
        totalLines += 1;
      } else {
        // Approximate character width - adjust based on your font
        const charsPerLine = 35; // Adjust this based on your container width
        totalLines += Math.ceil(line.length / charsPerLine);
      }
    });

    const calculatedHeight = Math.max(20, totalLines * 20);
    const constrainedHeight = Math.min(calculatedHeight, 100);
    setInputHeight(constrainedHeight);
  };

  const renderMessage = (message: Message) => {
    if (message.type === "media") {
      return (
        <View
          key={message.id}
          className={`mb-4 ${message.isOwn ? "items-end" : "items-start"}`}
        >
          <View className="flex-row gap-3">
            <View
              style={{ width: 80, height: 80 }}
              className="bg-black rounded-lg"
            />
            <View
              style={{ width: 80, height: 80 }}
              className="bg-black rounded-lg"
            />
          </View>
          <Text
            className={`text-[11px] mt-1 font-mulish-extrabold ${message.isOwn ? "text-dark-blue" : "text-white"} `}
          >
            {formatTime(message.time)}
          </Text>
        </View>
      );
    }

    return (
      <View
        key={message.id}
        className={`mb-4 ${message.isOwn ? "items-end" : "items-start"}`}
      >
        <View
          className="px-4 pt-3"
          style={{
            backgroundColor: message.isOwn ? "#E8F1FF" : "#4C935E",
            maxWidth: 264,
            paddingBottom: 8,
            borderTopRightRadius: message.isOwn ? 0 : 18,
            borderBottomRightRadius: message.isOwn ? 0 : 18,
            borderTopLeftRadius: message.isOwn ? 18 : 0,
            borderBottomLeftRadius: message.isOwn ? 18 : 0,
          }}
        >
          <Text
            className={`text-[14px] ${
              message.isOwn ? "text-dark-blue" : "text-white"
            } font-jost-semibold`}
          >
            {message.text}
          </Text>
          <Text
            className={`text-[11px] mt-1 text-[#545454] text-right font-mulish-medium ${message.isOwn ? "text-dark-blue" : "text-white"}`}
          >
            {formatTime(message.time)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-6 py-4 bg-[#F5F9FF]">
          <View className="flex-row items-center justify-between">
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
            <View className="flex-row items-center gap-4">
              <TouchableOpacity activeOpacity={0.7}>
                <Phone size={24} color="#0B1354" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Search size={24} color="#0B1354" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 20,
              
            }}
          >
            {/* Today Badge */}
            <View className="items-center mb-6">
              <View className="bg-[#E8F1FF] px-4 py-2 rounded-full">
                <Text className="text-[14px] text-[#545454] font-mulish-medium">
                  Today
                </Text>
              </View>
            </View>

            {messages.map(renderMessage)}

            {/* Typing Indicator */}
            {isTyping && (
              <View className="mb-4 items-start">
                <View
                  className="px-4 py-3 rounded-[18px] rounded-bl-[8px] shadow-[0px_2px_4px_0px_#00000008] flex-row items-center"
                  style={{ backgroundColor: "#4C935E" }}
                >
                  <View className="flex-row gap-1">
                    <View className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <View
                      className="w-2 h-2 bg-white rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <View
                      className="w-2 h-2 bg-white rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Message Input */}
          <View
            className="px-6 pt-1 bg-[#F5F9FF]"
            style={{ paddingBottom: Math.max(insets.bottom + 16, 20) }}
          >
            <View
              style={{ paddingLeft: 16, paddingRight: 8 }}
              className={`
                flex-row items-center bg-white rounded-full py-2
                border-2 border-[#E8F1FF]
                transition-all duration-200
                ${
                  isInputFocused
                    ? "border-primary shadow-xl shadow-primary/20"
                    : ""
                }
              `}
            >
              <TextInput
                className="flex-1 text-[16px] text-[#545454] font-mulish-medium"
                placeholder="Message"
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={handleTextChange}
                onContentSizeChange={handleContentSizeChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                multiline
                maxLength={500}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                style={{
                  height: inputHeight,
                  textAlignVertical: "center",
                  outline: "none",
                }}
              />

              <TouchableOpacity activeOpacity={0.7} className="mr-3">
                <Paperclip size={20} color="#545454" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.7}
                className="w-12 h-12 bg-primary rounded-full items-center justify-center"
                disabled={!inputText.trim()}
              >
                {inputText.trim() ? (
                  <Send size={24} color="white" />
                ) : (
                  <Mic size={24} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
