import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

const InterestRateScreen = ({ navigation }) => {
  const interestData = [
    { kind: "Individual customers", deposit: "5m", rate: "4.70%" },
    { kind: "Corporate customers", deposit: "2m", rate: "5.50%" },
    { kind: "Individual customers", deposit: "1m", rate: "4.50%" },
    { kind: "Corporate customers", deposit: "6m", rate: "2.50%" },
    { kind: "Individual customers", deposit: "1m", rate: "4.50%" },
    { kind: "Corporate customers", deposit: "8m", rate: "6.50%" },
    { kind: "Individual customers", deposit: "1m", rate: "4.50%" },
    { kind: "Individual customers", deposit: "7m", rate: "4.75%" },
    { kind: "Corporate customers", deposit: "7m", rate: "6.20%" },
    { kind: "Individual customers", deposit: "1m", rate: "4.50%" },
    { kind: "Individual customers", deposit: "12m", rate: "5.90%" },
    { kind: "Individual customers", deposit: "3m", rate: "4.55%" },
    { kind: "corporate customers", deposit: "9m", rate: "7.10%" },

  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Interest rate</Text>
      </View>

      {/* Main Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Table Headings */}
        <View style={styles.tableHead}>
          <Text style={styles.headText}>Interest kind</Text>
          <Text style={styles.headText}>Deposit</Text>
          <Text style={styles.headText}>Rate</Text>
        </View>

        {/* Hardcoded Data Rows */}
        {interestData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cellText}>{item.kind}</Text>
            <Text style={styles.cellText}>{item.deposit}</Text>
            <Text style={[styles.cellText, { color: '#2563EB', fontWeight: '700' }]}>{item.rate}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 75,
    paddingBottom: 30
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10
  },

  content: { padding: 20 },

  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  headText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  cellText: {
    fontSize: 15,
    color: '#333'
  }
});

export default InterestRateScreen;