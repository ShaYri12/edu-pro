import { Platform, StatusBar } from "react-native";

export const configureSystemUI = () => {
  if (Platform.OS === "android") {
    try {
      // Configure status bar
      StatusBar.setBarStyle("dark-content", true);
      StatusBar.setBackgroundColor("#F5F9FF", true);
      StatusBar.setTranslucent(false);
    } catch (error) {
      console.warn("Failed to configure system UI:", error);
    }
  }
};
