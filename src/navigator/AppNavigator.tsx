// npm install @react-navigation/native
// npm install @react-navigation/stack
// npm install @react-navigation/native-stack
// npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ApplyPage from "../pages/Apply/ApplyPage";
import LawnsPage from "../pages/LawnsPage/LawnsPage";
import SavedLawnsPage from "../pages/SavedLawns/SavedLawns";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import LawnDetailPage from "../pages/LawnDetailPage/LawnDetailPage";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lawns" component={LawnsPage} />
        <Stack.Screen name="Saved Lawns" component={SavedLawnsPage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="Apply" component={ApplyPage} />
        <Stack.Screen name="Lawn Details" component={LawnDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
