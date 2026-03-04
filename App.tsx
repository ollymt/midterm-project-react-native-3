import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LawnContext, LawnProvider } from "./src/contexts/useLawnData";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigator/AppNavigator";
import { ThemeContext } from "@react-navigation/native";
import { ThemeProvider } from "./src/contexts/ThemeContext";

export default function App() {
  const [lawnData] = useState(null);
  const [items] = useState(null);
  const [loading] = useState(true);

  return (
    <LawnProvider>
      <ThemeProvider>
        <SafeAreaProvider style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </LawnProvider>
  );
}
