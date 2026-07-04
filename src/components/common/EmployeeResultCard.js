import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Image
} from "react-native";
import { useTranslation } from "react-i18next";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EmployeeResultCard = ({ result }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const date = result.createdAt ? result.createdAt.toDate() : new Date();
  const employeeDetails = result.employeeDetails || {};

  const score = result.score || 0;
  const attempts = result.totalAttempts || (result.attempts?.length || 0);
  const answers = result.attempts || [];

  const getScoreColor = (score) => {
    if (score >= 12) return "#4CAF50"; // Good
    if (score >= 8) return "#2196F3";  // Medium
    if (score >= 4) return "#FF9800";  // Low
    return "#F44336";                  // Very Low
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
       {/* Header */}
       <View style={styles.header}>
       {employeeDetails.photoUrl ? (
  <Image
    source={{ uri: employeeDetails.photoUrl }}
    style={styles.photo}
    onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
  />
) : (
  <View style={[styles.photo, styles.noPhoto]}>
    <Text style={styles.noPhotoText}>
      {(employeeDetails.name || "NA").substring(0, 2).toUpperCase()}
    </Text>
  </View>
)}

         <View style={styles.details}>
           <Text style={styles.name}>{employeeDetails.name || "Unknown"}</Text>
           <Text style={styles.employeeId}>
             {t("idPrefix", { id: employeeDetails.employeeCode || "N/A" })}
           </Text>
           <Text style={styles.date}>{date.toLocaleDateString()}</Text>
         </View>
       </View>

      {/* Summary */}
      <View style={styles.body}>
        <Text style={styles.scoreLine}>
          {t("attempts")}: {attempts}
        </Text>
        <View
          style={[styles.scoreBadge, { backgroundColor: getScoreColor(score) }]}
        >
          <Text style={styles.scoreText}>{score} pts</Text>
        </View>
      </View>

      {/* Expand/Collapse Button */}
      {answers.length > 0 && (
        <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
          <Text style={styles.expandText}>
            {expanded ? t("hideAttempts") : t("viewAttempts")}
          </Text>
        </TouchableOpacity>
      )}

      {/* Attempts Detail */}
      {expanded && (
        <View style={styles.attemptsContainer}>
          {answers.map((ans, index) => (
            <View key={index} style={styles.attemptRow}>
                <Text style={styles.attemptText}>{t("attempts")} {index + 1} → {ans.hazard}{" "} || {ans.points} pts</Text>
                <Text style={styles.selectedExitText}>{t("selectedExit")}: {ans.selectedExit}{" "}</Text>
                <Text style={styles.nearestExitText}>{t("nearestExit")}: {ans.nearestExit} {" "}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  photo: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  noPhoto: { backgroundColor: "#9C27B0", justifyContent: "center", alignItems: "center" },
  noPhotoText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  details: {
    flex: 1,
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  employeeId: { fontSize: 14, color: "#666" },
  date: { fontSize: 12, color: "#888" },
  scoreBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  scoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
  body: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  scoreLine: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#4f46e5",
    marginTop: 4,
  },
  expandButton: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
  expandText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4f46e5",
  },
  attemptsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  attemptRow: {
    display:"flex",
    flexDirection:"column",
    marginBottom: 6,
  },
  attemptText: {
    fontSize: 13,
    color: "#4f46e5",
  },
  attempt: {
    fontSize: 18,
    fontWeight:"bold",
    color: "#4f46e5",
  },
  selectedExitText: {
    fontSize: 13,
    color: "#EF7722",
  },
  nearestExitText: {
    fontSize: 13,
    color: "#59AC77",
  },
});

export default EmployeeResultCard;
