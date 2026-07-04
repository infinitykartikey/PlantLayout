import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTest } from "../context/TestContext";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";

export default function ResultScreen({ navigation }) {

  const { t } = useTranslation();
  
  const { employeeData, testData, resetTest } = useTest();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = (employeeData.name || "NA")
    .substring(0, 2)
    .toUpperCase();

  const saveResult = async () => {
    if (isSaving || saved) return;
    setIsSaving(true);

    try {
      if (!employeeData || !employeeData.employeeCode) {
        console.error("❌ Missing employee data");
        setIsSaving(false);
        return;
      }

      const employeeCode = String(employeeData.employeeCode).trim();
      const employeeRef = firestore()
        .collection("PlantLayout") // employees collection
        .doc(employeeCode);

      // ===== Upload photo if available =====
      let photoUrl = employeeData.photoUrl ?? null;
      if (!photoUrl && employeeData.photo) {
        const fileRef = storage().ref(
          `employees/${employeeCode}/profile.jpg`
        );
        await fileRef.putFile(employeeData.photo);
        photoUrl = await fileRef.getDownloadURL();
      }

      // ===== Save/Update employee details =====
      await employeeRef.set(
        {
          name: employeeData.name,
          employeeCode,
          testDate: employeeData.testDate,
          photoUrl: photoUrl ?? null,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      // ===== Save test result in "PlantLayoutResults" subcollection =====
      await employeeRef.collection("Results").add({
        score: testData.score,
        totalAttempts: testData.totalAttempts,
        attempts: testData.attempts,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log("✅ Employee + Plant Layout Result saved successfully!");
      setSaved(true);

      // Navigate home
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } catch (error) {
      console.error("❌ Error saving result:", error);
      setIsSaving(false); // allow retry
    }
  };

  return (
    <View style={styles.root}>
      {/* ===== Employee Info ===== */}
      <View style={styles.employeeCard}>
      {employeeData.photoUrl || employeeData.photo ? (
  <Image
    source={{
      uri: employeeData.photoUrl || employeeData.photo, // show uploaded URL if exists, else local URI
    }}
    style={styles.photo}
  />
) : (
  <View style={[styles.photo, styles.noPhoto]}>
    <Text style={styles.noPhotoText}>{initials}</Text>
  </View>
)}
        <View style={styles.info}>
          <Text style={styles.name}>{employeeData.name || "Unknown"}</Text>
          <Text style={styles.code}>{t("idPrefix", { id: employeeData.employeeCode || "N/A" })}</Text>
          <Text style={styles.date}>
            Test Date: {new Date(employeeData.testDate).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* ===== Score Summary ===== */}
      <View style={styles.summaryCard}>
        <Text style={styles.score}>Score: {testData.score}</Text>
        <Text>Total Attempts: {testData.totalAttempts}</Text>
      </View>

      {/* ===== Attempts List ===== */}
      <FlatList
        data={testData.attempts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.attemptCard}>
            <Text style={styles.attemptTitle}>Attempt {index + 1}</Text>
            <Text>Hazard: {item.hazard}</Text>
            <Text>Nearest Exit: {item.nearestExit}</Text>
            <Text>Selected Exit: {item.selectedExit}</Text>
            <Text>Points: {item.points}</Text>
          </View>
        )}
      />

      {/* ===== Actions ===== */}
      <View style={styles.actions}>
      <TouchableOpacity
  style={[
    styles.btn,
    (isSaving || saved) && styles.btnDisabled,
  ]}
  onPress={saveResult}
  disabled={isSaving || saved}
>
  {isSaving ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.btnText}>{saved ? "Saved" : "Home"}</Text>
  )}
</TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            resetTest();
            navigation.replace("Training");
          }}
        >
          <Text style={styles.btnText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },

  employeeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  photo: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  noPhoto: { backgroundColor: "#4f46e5", justifyContent: "center", alignItems: "center" },
  noPhotoText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold", color: "#111" },
  code: { fontSize: 14, color: "#444", marginTop: 2 },
  date: { fontSize: 12, color: "#666", marginTop: 2 },

  summaryCard: {
    backgroundColor: "#e0e7ff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  score: { fontSize: 20, fontWeight: "700", color: "#1e3a8a" },

  attemptCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  attemptTitle: { fontWeight: "bold", marginBottom: 4 },

  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  btn: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  btnDisabled: { backgroundColor: "#9ca3af", opacity: 0.8 },
  btnText: { color: "#fff", fontWeight: "600" },
});
