// src/components/DataTable.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DataTable = ({ data, columns }) => {
  const renderHeader = () => (
    <View style={styles.headerRow}>
      {columns.map((column) => (
        <Text 
          key={column.key} 
          style={[styles.headerCell, { flex: column.flex || 1 }]}
        >
          {column.title}
        </Text>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={[
      styles.row,
      index % 2 === 0 ? styles.evenRow : styles.oddRow
    ]}>
      {columns.map((column) => (
        <Text 
          key={column.key} 
          style={[
            styles.cell, 
            { flex: column.flex || 1, textAlign: column.align || 'left' }
          ]}
        >
          {column.render ? column.render(item) : item[column.key]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `row-${index}`}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    maxHeight: 300,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  evenRow: {
    backgroundColor: '#F9F9F9',
  },
  oddRow: {
    backgroundColor: '#FFF',
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
});

export default DataTable;
