// src/components/ImportanceSelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RECOVERY_FACTORS = {
  CRITICAL: { weight: 1.5, description: "Essential business operations" },
  HIGH: { weight: 1.2, description: "Important but not immediately critical" },
  MEDIUM: { weight: 1.0, description: "Standard business operations" },
  LOW: { weight: 0.8, description: "Supporting functions" },
};

const ImportanceSelector = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Affected Area Importance</Text>
      <View style={styles.optionsContainer}>
        {Object.keys(RECOVERY_FACTORS).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.option,
              selectedValue === key && styles.selectedOption
            ]}
            onPress={() => onValueChange(key)}
          >
            <Text
              style={[
                styles.optionText,
                selectedValue === key && styles.selectedOptionText
              ]}
            >
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.description}>
        {RECOVERY_FACTORS[selectedValue]?.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    width: '24%',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
});

export default ImportanceSelector;