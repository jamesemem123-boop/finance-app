

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';

const TABS = ['Electric', 'Water', 'Internet'];

// TODO (Firebase/Backend): This screen currently uses hardcoded mock data below because
// src/config/firebase.js is not set up yet (no `auth` or `db` exports as of now).
//
// Once firebase.js is ready (Firebase app initialized, `auth` and `db` exported),
// replace the TRANSACTIONS array + useState below with a live Firestore fetch:
//
//   import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
//   import { db, auth } from '../config/firebase';
//   import { useFocusEffect } from '@react-navigation/native';
//
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   const fetchTransactions = useCallback(async () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return setTransactions([]);
//     const q = query(
//       collection(db, 'transactions'),
//       where('userId', '==', currentUser.uid),
//       orderBy('date', 'desc')
//     );
//     const snapshot = await getDocs(q);
//     setTransactions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   }, []);
//
//   useFocusEffect(useCallback(() => { fetchTransactions(); }, [fetchTransactions]));
//
// Each transaction document should be created in Firestore right when a payment
// succeeds — in the handlePay function of ElectricityBillingConfirmScreen.js,
// WaterBillingConfirmScreen.js, and InternetBillingConfirmScreen.js — with fields:
// { userId, billType, month, date, status, company, amount }
const TRANSACTIONS = [
  {
    id: '1',
    billType: 'Internet',
    month: 'October',
    date: '30/10/2019',
    status: 'Unsuccessfully',
    company: 'Capi Telecom',
    amount: 50,
  },
  {
    id: '2',
    billType: 'Internet',
    month: 'September',
    date: '30/10/2019',
    status: 'Successfully',
    company: 'Glo',
    amount: 50,
  },
  {
    id: '3',
    billType: 'Internet',
    month: 'August',
    date: '30/10/2019',
    status: 'Successfully',
    company: 'MTN',
    amount: 50,
  },
  {
    id: '4',
    billType: 'Internet',
    month: 'July',
    date: '30/10/2019',
    status: 'Successfully',
    company: 'Airtel Nigeriia',
    amount: 50,
  },
  {
    id: '5',
    billType: 'Internet',
    month: 'June',
    date: '30/10/2019',
    status: 'Successfully',
    company: 'Capi Telecom',
    amount: 50,
  },
  {
    id: '6',
    billType: 'Electric',
    month: 'October',
    date: '28/10/2019',
    status: 'Successfully',
    company: 'Ikeja Electric',
    amount: 5000,
  },
  {
    id: '7',
    billType: 'Electric',
    month: 'September',
    date: '28/09/2019',
    status: 'Successfully',
    company: 'Ikeja Electric',
    amount: 5000,
  },
  {
    id: '8',
    billType: 'Water',
    month: 'October',
    date: '25/10/2019',
    status: 'Successfully',
    company: 'Lagos Water Corporation',
    amount: 3000,
  },
  {
    id: '9',
    billType: 'Water',
    month: 'September',
    date: '25/09/2019',
    status: 'Unsuccessfully',
    company: 'Lagos Water Corporation',
    amount: 3000,
  },
];

export default function PaymentHistoryScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Internet');

  const filteredTransactions = TRANSACTIONS.filter((t) => t.billType === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment history</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Transaction list */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} payments yet.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isSuccessful = item.status === 'Successfully';
          return (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardMonth}>{item.month}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>

              <View style={styles.cardBottomRow}>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardLabel}>Status</Text>
                  <Text
                    style={[
                      styles.cardStatus,
                      isSuccessful ? styles.statusSuccess : styles.statusFailed,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <View style={styles.cardColumn}>
                  <Text style={styles.cardLabel}>Amount</Text>
                  <Text style={styles.cardAmount}>${item.amount}</Text>
                </View>
              </View>

              <View style={styles.companyRow}>
                <Text style={styles.cardLabel}>Company</Text>
                <Text style={styles.cardCompany}>{item.company}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginLeft: 12,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    backgroundColor: '#EDEDF3',
    borderRadius: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B6B76',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardMonth: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  cardDate: {
    fontSize: 12,
    color: '#9A9AA5',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardColumn: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: '#9A9AA5',
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: '700',
  },
  statusSuccess: {
    color: '#2563EB',
  },
  statusFailed: {
    color: '#EF4444',
  },
  cardAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  companyRow: {
    marginTop: 2,
  },
  cardCompany: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#9A9AA5',
  },
});