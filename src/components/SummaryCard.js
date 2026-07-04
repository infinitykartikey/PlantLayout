// src/components/SummaryCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SummaryCard = ({ title, data, highlight, highlightLabel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {/* Show highlight section if provided */}
      {highlight && highlightLabel && (
        <View style={styles.highlightContainer}>
          <Text style={styles.highlightLabel}>{highlightLabel}</Text>
          <Text style={styles.highlightValue}>{highlight}</Text>
        </View>
      )}
      
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  highlightContainer: {
    backgroundColor: '#E8F4FF',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  highlightLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default SummaryCard;