import { Pressable, Image, Text, View, Alert } from "react-native";
import { useContext } from "react";
import { LawnContext } from "../../contexts/useLawnData";
import { getStyles } from "../../styles/MainStyles";
import Button from "../Button/Button";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../contexts/ThemeContext";

interface CardProps {
  title: string;
  mainCategory: string;
  companyName: string;
  companyLogo: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  locations: string[];
  onPress?: () => void;
  id: string;
  isSaved: boolean;
}

export default function LawnCard({
  title,
  mainCategory,
  companyName,
  companyLogo,
  jobType,
  workModel,
  seniorityLevel,
  minSalary,
  maxSalary,
  currency,
  locations,
  onPress,
  id,
  isSaved,
}: CardProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { items, loading, toggleSaved } = useContext(LawnContext);

  // Helper to format salary (e.g., 5000 -> 5k)
  const formatSalary = (num: number) =>
    num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;

  const handleApply = (e: any) => {
    // Prevents the whole card's onPress from firing when clicking the button
    e.stopPropagation();

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Application Sent",
      `You've applied for the ${title} position at ${companyName}!`,
    );
  };

  return (
    <Pressable style={[styles.card]} onPress={onPress}>
      {/* Company Logo */}
      <Image
        source={{ uri: companyLogo }}
        style={{
          width: 50, // Logos usually look better as smaller squares or circles
          height: 50,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <View>
        <Text
          style={[styles.cardItemName, { color: theme.text }]}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text style={{ color: theme.textSecondary, fontSize: 14 }}>
          {companyName} • {workModel}
        </Text>
      </View>

      <View style={[styles.cardItemStats, { marginVertical: 8 }]}>
        <Text style={{ color: theme.text }}>📍 {locations.join(", ")}</Text>
        <Text style={{ color: theme.text }}>🏷️ {seniorityLevel}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={[styles.cardItemPrice, { color: theme.primary, flex: 2 }]}>
          {currency}
          {formatSalary(minSalary)} - {formatSalary(maxSalary)}
        </Text>
        <Button
          variant="primary"
          enabled={true}
          text="Apply"
          onPress={handleApply}
          style={{ flex: 1 }}
        />
        <Button
          variant="secondary"
          enabled={true}
          text={(isSaved ? "Saved" : "Save")}
          style={{ flex: 1 }}
          onPress={() => { toggleSaved(id) }}
        />
      </View>
    </Pressable>
  );
}
