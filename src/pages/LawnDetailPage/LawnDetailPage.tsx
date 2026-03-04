import { View, Text, Image, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { LawnContext } from "../../contexts/useLawnData";
import { getStyles } from "../../styles/MainStyles";
import { useTheme } from "../../contexts/ThemeContext";
import RenderHtml from "react-native-render-html";
import Button from "../../components/Button/Button";

export default function LawnDetailPage({ route, navigation }) {
  // Pull the 'job' object out of the route parameters
  const { job } = route.params;
  const { items, loading, toggleSaved } = useContext(LawnContext);
  const [ isSaved, setIsSaved ] = useState(job.isSaved)

  return (
    <ScrollView style={{ flex: 1, padding: 20, gap: 10 }}>
      <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
        <Image
          style={{ aspectRatio: 1, flex: 1.2 }}
          source={{ uri: job.companyLogo }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", flex: 4 }}>
          {job.title}
        </Text>
      </View>
      <Text style={{ fontSize: 20 }}>🏢 Company Name: {job.companyName}</Text>
      <Text style={{ fontSize: 16 }}>
        🤑 Salary: {job.currency}
        {job.minSalary} - {job.maxSalary}
      </Text>

      {/* Example of displaying the locations array */}
      <Text style={{ fontSize: 16 }}>
        📍 Location: {job.locations.join(", ")}
      </Text>
      <Text>Lawn Type: {job.jobType}</Text>
      <Text>Lawn Model: {job.workModel}</Text>
      <Text>Seniority Level: {job.seniorityLevel}</Text>
      <RenderHtml
        source={{ html: job.description }} // This is your HTML string from the API
      />
      <View style={{ marginTop: "20", gap: 4, marginBottom: "60" }}>
        <Button
          variant="primary"
          text="Apply"
          style={{ paddingVertical: 10 }}
        />
        <Button
          variant="secondary"
          enabled={true}
          text={isSaved ? "Saved" : "Save"}
          style={{ flex: 1 }}
          onPress={() => {
            toggleSaved(job.id);
            setIsSaved(!isSaved);
          }}
        />
      </View>
    </ScrollView>
  );
}
