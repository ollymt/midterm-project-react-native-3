import { View, Text, FlatList, Pressable, RefreshControl, TextInput } from "react-native";
import { getStyles } from "../../styles/MainStyles";
import { useTheme } from "../../contexts/ThemeContext";
import { useContext, useState } from "react";
import { LawnContext } from "../../contexts/useLawnData";
import LawnCard from "../../components/LawnCard/LawnCard";
import * as Haptics from "expo-haptics";

export default function LawnsPage({ navigation }) {
  const { items, refreshing, fetchApiData, loading } = useContext(LawnContext);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const onRefresh = () => {
    fetchApiData(true);
  };

  // Optional: Show a message if there's no data yet
  if (loading && !refreshing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ color: theme.text }}>Loading jobs...</Text>
      </View>
    );
  }

  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to filter the items based on the title
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: theme.background }}>
      {/* Navigation Shortcut */}
      <View style={{ height: 55, flexDirection: "row", gap: 10 }}>
        <Pressable
          style={[styles.card, { padding: 0, height: 45, flex: 2, justifyContent: "center" }]} // Added margin so it doesn't touch the list
          onPress={() => {
            navigation.navigate("Saved Lawns")
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          }}
        >
          <Text
            style={[
              styles.cardItemName,
              { color: theme.text, textAlign: "center", fontSize: 16 },
            ]}
          >
            View Saved Lawns
          </Text>
        </Pressable>

        <Pressable
          style={[styles.card, { padding: 0, height: 45, flex: 1, justifyContent: "center" }]} // Added margin so it doesn't touch the list
          onPress={() => {
            navigation.navigate("Settings")
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
        >
          <Text
            style={[
              styles.cardItemName,
              { color: theme.text, textAlign: "center", fontSize: 16 },
            ]}
          >
            Settings
          </Text>
        </Pressable>
      </View>

      <View style={{ paddingBottom: 10 }}>
        <TextInput
          placeholder="Search Lawns"
          placeholderTextColor={theme.textSecondary}
          style={{
            height: 45,
            backgroundColor: theme.card,
            borderRadius: 10,
            paddingHorizontal: 15,
            color: theme.text,
          }}
          keyboardAppearance={theme.isDarkMode ? "dark" : "light"}
          value={searchQuery}
          onChangeText={setSearchQuery} // Updates state as you type
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        // SPREAD the item props so they match your interface:
        renderItem={({ item }) => (
          <LawnCard
            {...item}
            navigation={navigation}
            onPress={() => {
              navigation.navigate("Lawn Details", { job: item })
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary} // Makes the spinner match your theme on iOS
          />
        }
        // Adds space at the bottom so the last card isn't cut off
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}