// LanguageSelectionScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const LanguageScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang);
    navigation.replace("Login"); // replace so user can’t go back to lang screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("Laguage")}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelect("en")}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelect("hi")}
      >
        <Text style={styles.buttonText}>हिंदी</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LanguageScreen;
