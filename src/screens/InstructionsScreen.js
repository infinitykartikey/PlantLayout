import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Video from "react-native-video";
import { useTranslation } from "react-i18next";

const InstructionScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const instructions = [
    t("instruction1", "You will see a random hazard zone highlighted."),
    t("instruction2", "Tap the highlighted hazard zone to confirm."),
    t("instruction3", "After hazard confirmation, three exits will blink."),
    t("instruction4", "Choose the nearest exit for safe evacuation."),
    t("instruction5", "You have only 3 attempts for the whole training."),
    t("instruction6", "Your score depends on correct hazard & nearest exit."),
    t("instruction7", "At the end, your performance will be saved."),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{t("testInstructionsTitle", "Plant Layout Hazard Training")}</Text>

        {instructions.map((item, index) => (
          <View key={index} style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>{index + 1}.</Text>
            <Text style={styles.instructionText}>{item}</Text>
          </View>
        ))}

        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>{t("gamePreview", "Preview of Training")}</Text>
          <View style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{t("tutorialVideo", "Tutorial Video")}</Text>
            <Video
              source={require("../assets/video/PlantLayout.mp4")}
              style={styles.video}
              controls
              resizeMode="contain"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("Form")}
        >
          <Text style={styles.startButtonText}>{t("startTest", "Start Training")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scrollContent: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9C27B0",
    textAlign: "center",
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9C27B0",
    marginRight: 8,
  },
  instructionText: { fontSize: 15, color: "#333", flexShrink: 1 },
  exampleContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
    textAlign: "center",
  },
  videoContainer: { marginTop: 10 },
  videoTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#000",
  },
  startButton: {
    marginTop: 30,
    backgroundColor: "#4f46e5",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  startButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default InstructionScreen;
