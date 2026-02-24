import 'react-native-reanimated';
import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Text as RNText, TextInput as RNTextInput } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider as UIThemeProvider } from '@/components/ui/theme';
import { ErrorBoundary } from '@/components/error-boundary';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // Jost (all 9 weights)
    "Jost-Thin": require("../assets/fonts/Jost-Thin.ttf"),
    "Jost-ExtraLight": require("../assets/fonts/Jost-ExtraLight.ttf"),
    "Jost-Light": require("../assets/fonts/Jost-Light.ttf"),
    "Jost-Regular": require("../assets/fonts/Jost-Regular.ttf"),
    "Jost-Medium": require("../assets/fonts/Jost-Medium.ttf"),
    "Jost-SemiBold": require("../assets/fonts/Jost-SemiBold.ttf"),
    "Jost-Bold": require("../assets/fonts/Jost-Bold.ttf"),
    "Jost-ExtraBold": require("../assets/fonts/Jost-ExtraBold.ttf"),

    // Mulish (8 weights)
    "Mulish-ExtraLight": require("../assets/fonts/Mulish-ExtraLight.ttf"),
    "Mulish-Light": require("../assets/fonts/Mulish-Light.ttf"),
    "Mulish-Regular": require("../assets/fonts/Mulish-Regular.ttf"),
    "Mulish-Medium": require("../assets/fonts/Mulish-Medium.ttf"),
    "Mulish-SemiBold": require("../assets/fonts/Mulish-SemiBold.ttf"),
    "Mulish-Bold": require("../assets/fonts/Mulish-Bold.ttf"),
    "Mulish-ExtraBold": require("../assets/fonts/Mulish-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      // Set default fonts for all Text and TextInput when not explicitly specified
      const TextAny = RNText as any;
      const TextInputAny = RNTextInput as any;

      if (!TextAny.defaultProps) TextAny.defaultProps = {};
      if (!TextInputAny.defaultProps) TextInputAny.defaultProps = {};

      TextAny.defaultProps.style = [TextAny.defaultProps.style, { fontFamily: 'Mulish-Bold' }];
      TextInputAny.defaultProps.style = [TextInputAny.defaultProps.style, { fontFamily: 'Mulish-Bold' }];

      // Hide the splash screen after fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Keep showing splash screen while loading
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <UIThemeProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack initialRouteName="index">
                <Stack.Screen name="popular-courses" options={{ headerShown: false }} />
                <Stack.Screen name="top-mentors" options={{ headerShown: false }} />
                <Stack.Screen name="search" options={{ headerShown: false }} />
                <Stack.Screen name="all-categories" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </UIThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
