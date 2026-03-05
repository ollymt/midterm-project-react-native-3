import { View, Text, FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useContext } from "react";
import { LawnContext } from "../../contexts/useLawnData";
import LawnCard from "../../components/LawnCard/LawnCard";
import { getStyles } from "../../styles/MainStyles";
import { useTheme } from "../../contexts/ThemeContext";
import * as Haptics from "expo-haptics";

export default function SavedLawnsPage({ navigation }) {
  const { items, refreshing, fetchApiData, loading } = useContext(LawnContext);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const filteredItems = items.filter((item) =>
    item.isSaved == true
  );
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: theme.background }}>
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
        // Adds space at the bottom so the last card isn't cut off
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
            <Text style={{ textAlign: "center", color: theme.textSecondary }}>You have no saved lawns.</Text>
        }
      />
    </View>
  );
}
