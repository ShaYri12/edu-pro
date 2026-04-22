import { Platform, StatusBar } from "react-native";

export const configureSystemUI = () => {
  if (Platform.OS === "android") {
    try {
      // Configure status bar only
      StatusBar.setBarStyle("dark-content", true);
      StatusBar.setBackgroundColor("#F5F9FF", true);
      StatusBar.setTranslucent(false);
      
      // Force a re-render to ensure colors stick
      setTimeout(() => {
        StatusBar.setBarStyle("dark-content", true);
        StatusBar.setBackgroundColor("#F5F9FF", true);
      }, 100);
      
    } catch (error) {
      console.warn("Failed to configure system UI:", error);
    }
  }
};
