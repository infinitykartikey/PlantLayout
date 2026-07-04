import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Image,
  Button,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n, { changeLanguage } from "../i18n";
import EmployeeResultCard from "../components/common/EmployeeResultCard"

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.locale);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "hi" : "en";
    changeLanguage(newLang);
    setLang(newLang);
  };

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const employeesSnapshot = await firestore().collection("PlantLayout").get();

      const fetchedResults = [];

      for (const empDoc of employeesSnapshot.docs) {
        const employeeDetails = empDoc.data();
        const resultsSnap = await empDoc.ref
          .collection("Results")
          .orderBy("createdAt", "desc")
          .limit(1) // latest result only
          .get();

        resultsSnap.forEach((resultDoc) => {
          const resultData = resultDoc.data();
          fetchedResults.push({
            id: resultDoc.id,
            employeeDetails,
            ...resultData,
          });
        });
      }

      setResults(fetchedResults);
      setFilteredResults(fetchedResults);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to load results.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  // filter by search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults(results);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = results.filter((result) => {
        const emp = result.employeeDetails || {};
        const name = (emp.name || "").toLowerCase();
        const code = (emp.employeeCode || "").toLowerCase();
        return name.includes(query) || code.includes(query);
      });
      setFilteredResults(filtered);
    }
  }, [searchQuery, results]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const handleClearSearch = () => setSearchQuery("");

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.resultsHeaderContainer}>
          <Text style={styles.resultsHeader}>{t("employeeTestResults")}</Text>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Button style={styles.takeTestButton} title={lang === "en" ? "हिंदी" : "English"} onPress={toggleLanguage} />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {error ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : filteredResults.length > 0 ? (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EmployeeResultCard result={item} />}
            style={styles.resultsList}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6200ee"]} />}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            {searchQuery.length > 0 ? (
              <Text style={styles.noResultsText}>
                No results found for "{searchQuery}"
              </Text>
            ) : (
              <>
                <Text style={styles.noResultsText}>No test results found.</Text>
                <Text style={styles.subText}>
                  Complete a test to see results here.
                </Text>
              </>
            )}
          </View>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.takeTestButton}
            onPress={() => navigation.navigate("Instructions")}
          >
            <Text style={styles.takeTestButtonText}>{t("startTest")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
  content: { flex: 1, padding: 20 },
  resultsHeaderContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  resultsHeader: { fontSize: 20, fontWeight: "bold", color: "#333" },
  searchContainer: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#ddd", marginBottom: 15, height: 46, alignItems: "center", paddingHorizontal: 12 },
  searchInput: { flex: 1, fontSize: 16, color: "#333", height: "100%" },
  clearButton: { padding: 8 },
  clearButtonText: { color: "#888", fontSize: 16, fontWeight: "bold" },
  resultsList: { flex: 1 },
  emptyStateContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, color: "#d32f2f", textAlign: "center" },
  noResultsText: { fontSize: 18, color: "#666", textAlign: "center" },
  subText: { fontSize: 14, color: "#888", textAlign: "center", marginTop: 8 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  photo: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  noPhoto: { backgroundColor: "#9C27B0", justifyContent: "center", alignItems: "center" },
  noPhotoText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  employeeId: { fontSize: 14, color: "#666" },
  date: { fontSize: 12, color: "#888" },
  scoreBadge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  scoreText: { color: "#fff", fontWeight: "bold" },
  body: { borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 8 },
  scoreLine: { fontSize: 14, color: "#333", marginTop: 4 },
  buttons: { width: "100%" },
  takeTestButton: { backgroundColor: "#4f46e5", paddingVertical: 15, borderRadius: 8, alignItems: "center", marginBottom: 25, width: "100%" },
  takeTestButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  
  attemptsContainer: {
    marginTop: 10,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
  },
  attemptRow: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  attemptLeft: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#9C27B0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  attemptIndex: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  attemptRight: {
    flex: 1,
  },
  attemptLine: {
    fontSize: 13,
    color: "#444",
  },
  noAttempts: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    paddingVertical: 6,
  },

  
  attemptsContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  attemptRow: {
    display:"flex",
    marginBottom: 4,
  },
  attemptText: {
    fontSize: 13,
    color: "#444",
  },
});

export default HomeScreen;
