import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "./utils/cn";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function ScreenWrapper({ 
  children, 
  className, 
  edges = ['top'] 
}: ScreenWrapperProps) {
  return (
    <SafeAreaView 
      className={cn("flex-1 bg-[#F5F9FF]", className)} 
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}