import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Phone,
  Paperclip,
  Mic,
  Search,
  Send,
  ChevronDown,
  X,
  ChevronUp,
} from "lucide-react-native";

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  type?: "text" | "media";
  images?: string[];
}

interface ChatContact {
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const scrollViewRef = useRef<ScrollView>(null);
  const searchInputRef = useRef<TextInput>(null);
  const messageRefs = useRef<{ [key: number]: View | null }>({});
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Contact info - in real app, this would come from navigation params or route
  const [contact] = useState<ChatContact>({
    name: "Ronald Richards",
    isOnline: true,
  });

  // Handle back navigation
  const handleGoBack = () => {
    if (isSearchMode) {
      // Exit search mode
      setIsSearchMode(false);
      setSearchText("");
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    } else {
      // Navigate back to previous screen
      router.back();
    }
  };

  // Search functionality
  const handleSearchPress = () => {
    setIsSearchMode(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    if (text.trim()) {
      // Find messages that contain the search text
      const results: number[] = [];
      messages.forEach((message, index) => {
        if (message.text.toLowerCase().includes(text.toLowerCase())) {
          results.push(index);
        }
      });
      setSearchResults(results);
      setCurrentSearchIndex(results.length > 0 ? 0 : -1);

      // Scroll to first result
      if (results.length > 0) {
        scrollToMessage(results[0]);
      }
    } else {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    }
  };

  const scrollToMessage = (messageIndex: number) => {
    // Use refs for more accurate scrolling
    const messageRef = messageRefs.current[messageIndex];
    if (messageRef) {
      messageRef.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          // Scroll to the message with some padding to center it better
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, y - 100), // 100px padding from top
            animated: true,
          });
        },
        () => {
          // Fallback if measureLayout fails
          const estimatedHeight = messageIndex * 80; // More conservative estimate
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, estimatedHeight - 100),
            animated: true,
          });
        }
      );
    } else {
      // Fallback if no ref
      const estimatedHeight = messageIndex * 80; // More conservative estimate
      scrollViewRef.current?.scrollTo({
        y: Math.max(0, estimatedHeight - 100),
        animated: true,
      });
    }
  };

  const navigateSearchResult = (direction: "up" | "down") => {
    if (searchResults.length === 0) return;

    let newIndex = currentSearchIndex;
    if (direction === "up") {
      newIndex =
        currentSearchIndex > 0
          ? currentSearchIndex - 1
          : searchResults.length - 1;
    } else {
      newIndex =
        currentSearchIndex < searchResults.length - 1
          ? currentSearchIndex + 1
          : 0;
    }

    setCurrentSearchIndex(newIndex);
    scrollToMessage(searchResults[newIndex]);
  };
  const autoScrollToBottom = (force: boolean = false) => {
    // Don't auto-scroll when in search mode unless forced
    if (isSearchMode && !force) return;

    if (force || !isUserScrolledUp) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  };

  // Handle scroll events to detect if user scrolled up beyond threshold
  const handleScroll = (event: any) => {
    // Don't update scroll state when in search mode
    if (isSearchMode) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Calculate distance from bottom
    const distanceFromBottom =
      contentSize.height - (layoutMeasurement.height + contentOffset.y);

    // Threshold: 80px from bottom - only auto-scroll if within this range
    const scrollThreshold = 40;

    // User is considered "scrolled up" if they're more than 80px from the bottom
    const userScrolledUpBeyondThreshold = distanceFromBottom > scrollThreshold;

    setIsUserScrolledUp(userScrolledUpBeyondThreshold);
  };

  // Auto-scroll when typing indicator changes
  useEffect(() => {
    if (isTyping && !isUserScrolledUp && !isSearchMode) {
      // Small delay to let the typing indicator render
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [isTyping, isUserScrolledUp, isSearchMode]);

  // Auto-scroll when messages change (new messages)
  useEffect(() => {
    if (messages.length > 0 && !isSearchMode) {
      // Only auto-scroll for new messages if user is near bottom and not searching
      setTimeout(() => {
        if (!isUserScrolledUp) {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      }, 50);
    }
  }, [messages.length, isUserScrolledUp, isSearchMode]);

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
      autoScrollToBottom(true);
    }, 100);
  }, []);

  // Keyboard event listeners for proper keyboard handling
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        // Scroll to bottom when keyboard opens with delay
        autoScrollToBottom(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
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

      // Auto scroll to bottom immediately for own messages
      autoScrollToBottom(true);

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

          // Auto scroll after reply - force scroll for immediate response
          setTimeout(() => {
            autoScrollToBottom();
          }, 50);
        }, 1500);
      }, 800);
    }
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleContentSizeChange = () => {
    // Auto-scroll when content size changes if user is near bottom and not in search mode
    if (!isUserScrolledUp && !isSearchMode) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    // No auto-scroll when typing unless at bottom
  };

  const handleInputFocus = () => {
    // Scroll to bottom when input is focused only if not scrolled up
    setTimeout(() => {
      autoScrollToBottom();
    }, 300); // Delay for keyboard animation
  };

  const handleInputBlur = () => {
    // Input blur handler - can add logic here if needed
  };

  const renderMessage = (message: Message, index: number) => {
    const isSearchResult = searchResults.includes(index);
    const isCurrentSearchResult =
      currentSearchIndex >= 0 && searchResults[currentSearchIndex] === index;

    // Create light version of #0961F5
    const primarySearchColor = "#0961F5";
    const lightSearchColor = "#E3F2FD"; // Light blue version
    const currentSearchColor = "#BBDEFB"; // Medium blue for current result

    if (message.type === "media") {
      return (
        <View
          key={message.id}
          ref={(ref) => {
            messageRefs.current[index] = ref;
          }}
          className={`mb-4 ${message.isOwn ? "items-end" : "items-start"}`}
          style={{
            backgroundColor: isCurrentSearchResult
              ? currentSearchColor
              : isSearchResult
                ? lightSearchColor
                : "transparent",
            borderRadius: isSearchResult ? 8 : 0,
            padding: isSearchResult ? 8 : 0,
          }}
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
        ref={(ref) => {
          messageRefs.current[index] = ref;
        }}
        className={`mb-4 ${message.isOwn ? "items-end" : "items-start"}`}
        style={{
          backgroundColor: isCurrentSearchResult
            ? currentSearchColor
            : isSearchResult
              ? lightSearchColor
              : "transparent",
          borderRadius: isSearchResult ? 8 : 0,
          padding: isSearchResult ? 8 : 0,
          marginHorizontal: isSearchResult ? -8 : 0,
        }}
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
          {isSearchMode ? (
            // Search Mode Header
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={handleGoBack}
                activeOpacity={0.7}
                className="mr-3"
              >
                <ArrowLeft size={24} color="#0B1354" />
              </TouchableOpacity>
              <View className="flex-1 flex-row items-center bg-white rounded-lg px-4 py-2 mr-3">
                <TextInput
                  ref={searchInputRef}
                  placeholder="Search messages..."
                  placeholderTextColor="#9CA3AF"
                  value={searchText}
                  onChangeText={handleSearchChange}
                  className="flex-1 text-[16px] text-[#202244] font-mulish-medium"
                  autoFocus
                />
                {searchText.length > 0 && (
                  <TouchableOpacity
                    onPress={() => handleSearchChange("")}
                    activeOpacity={0.7}
                    className="ml-2"
                  >
                    <X size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
              {searchResults.length > 0 && (
                <View className="flex-row items-center gap-2">
                  <Text className="text-[12px] text-[#545454] font-mulish-medium">
                    {currentSearchIndex + 1}/{searchResults.length}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigateSearchResult("up")}
                    activeOpacity={0.7}
                    className="p-1"
                  >
                    <ChevronUp size={20} color="#0B1354" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigateSearchResult("down")}
                    activeOpacity={0.7}
                    className="p-1"
                  >
                    <ChevronDown size={20} color="#0B1354" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            // Normal Mode Header
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                  <ArrowLeft size={24} color="#0B1354" />
                </TouchableOpacity>
                <View className="ml-3">
                  <Text className="text-dark-blue font-jost-semibold text-[21px]">
                    {contact.name}
                  </Text>
                  {contact.isOnline && (
                    <Text className="text-[#4C935E] font-mulish-medium text-[12px]">
                      Online
                    </Text>
                  )}
                </View>
              </View>
              <View className="flex-row items-center gap-4">
                <TouchableOpacity activeOpacity={0.7}>
                  <Phone size={24} color="#0B1354" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSearchPress}
                  activeOpacity={0.7}
                >
                  <Search size={24} color="#0B1354" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View
          className="flex-1"
          style={{
            marginBottom: keyboardHeight, // This pushes content up when keyboard appears
          }}
        >
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 20,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
            onScroll={handleScroll}
            scrollEventThrottle={100}
            onContentSizeChange={handleContentSizeChange}
          >
            {/* Today Badge */}
            <View className="items-center mb-6">
              <View className="bg-[#E8F1FF] px-4 py-2 rounded-full">
                <Text className="text-[14px] text-[#545454] font-mulish-medium">
                  Today
                </Text>
              </View>
            </View>

            {messages.map((message, index) => renderMessage(message, index))}

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

          {/* Scroll to bottom button */}
          {isUserScrolledUp && (
            <TouchableOpacity
              onPress={() => autoScrollToBottom(true)}
              activeOpacity={0.7}
              className="absolute right-6 bottom-20 w-10 h-10 bg-white rounded-full items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <ChevronDown size={20} color="#0B1354" />
            </TouchableOpacity>
          )}

          {/* Message Input */}
          <View
            className="px-6 py-4 bg-[#F5F9FF]"
            style={{
              paddingBottom: Math.max(insets.bottom + 16, 20),
            }}
          >
            <View
              style={{
                paddingLeft: 16,
                paddingRight: 8,
                flexDirection: "row",
                alignItems: "flex-end",
                backgroundColor: "white",
                borderRadius: 24,
                paddingVertical: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
                minHeight: 56, // Ensure consistent minimum height
              }}
            >
              <TextInput
                placeholder="Message"
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={handleTextChange}
                onContentSizeChange={handleContentSizeChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                multiline
                maxLength={500}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#202244",
                  minHeight: 40,
                  maxHeight: 120,
                  fontFamily: "Mulish-Medium",
                  backgroundColor: "transparent",
                  paddingHorizontal: 0,
                  paddingVertical: 8,
                  textAlignVertical: "top",
                }}
              />

              <TouchableOpacity activeOpacity={0.7} className="mr-3 mb-1 py-3">
                <Paperclip size={20} color="#545454" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.7}
                className="w-12 h-12 bg-primary rounded-full items-center justify-center mb-1"
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
        </View>
      </SafeAreaView>
    </View>
  );
}
