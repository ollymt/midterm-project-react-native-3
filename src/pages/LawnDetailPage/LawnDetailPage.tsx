import { View, Text, Image, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { LawnContext } from "../../contexts/useLawnData";
import { getStyles } from "../../styles/MainStyles";
import { useTheme } from "../../contexts/ThemeContext";
import RenderHtml from "react-native-render-html";
import Button from "../../components/Button/Button";
import * as Haptics from "expo-haptics";

export default function LawnDetailPage({ route, navigation }) {
  // Pull the 'job' object out of the route parameters
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { job } = route.params;
  const { items, loading, toggleSaved } = useContext(LawnContext);
  const [isSaved, setIsSaved] = useState(job.isSaved);

  const handleApply = (e: any) => {
    // Prevents the whole card's onPress from firing when clicking the button
    e.stopPropagation();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Check if navigation exists before using it
    if (navigation) {
      navigation.navigate("Apply");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        gap: 10,
        backgroundColor: theme.background,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
        <Image
          style={{ aspectRatio: 1, flex: 1.2 }}
          source={{ uri: job.companyLogo }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            flex: 4,
            color: theme.text,
          }}
        >
          {job.title}
        </Text>
      </View>
      <Text style={{ fontSize: 20, color: theme.text }}>
        🏢 Company Name: {job.companyName}
      </Text>
      <Text style={{ fontSize: 16, color: theme.text }}>
        🤑 Salary: {job.currency}
        {job.minSalary} - {job.maxSalary}
      </Text>

      {/* Example of displaying the locations array */}
      <Text style={{ fontSize: 16, color: theme.text }}>
        📍 Location: {job.locations.join(", ")}
      </Text>
      <Text style={{ color: theme.text }}>Lawn Type: {job.jobType}</Text>
      <Text style={{ color: theme.text }}>Lawn Model: {job.workModel}</Text>
      <Text style={{ color: theme.text }}>
        Seniority Level: {job.seniorityLevel}
      </Text>
      <RenderHtml
        baseStyle={{ color: theme.text }}
        source={{ html: job.description }} // This is your HTML string from the API
      />
      <View style={{ marginTop: "20", gap: 4, marginBottom: "60" }}>
        <Button
          variant="primary"
          text="Apply"
          style={{ paddingVertical: 10 }}
          onPress={handleApply}
        />
        <Button
          variant="secondary"
          enabled={true}
          text={isSaved ? "Saved" : "Save"}
          style={{ flex: 1 }}
          onPress={() => {
            toggleSaved(job.id);
            setIsSaved(!isSaved);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        />
      </View>
    </ScrollView>
  );
}
